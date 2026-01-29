import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MovieCard from '../components/MovieCard';
import { movieService, categoryService } from '../services/api';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('created_at');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchMovies();
  }, [search, selectedCategory, sortBy, currentPage]);

  const fetchCategories = async () => {
    try {
      const response = await categoryService.getCategories();
      if (response.data.success) {
        setCategories(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchMovies = async () => {
    setLoading(true);
    try {
      const params = {
        page: currentPage,
        per_page: 12,
        sort_by: sortBy,
        sort_order: 'desc',
      };

      if (search) params.search = search;
      if (selectedCategory) params.category_id = selectedCategory;

      const response = await movieService.getMovies(params);
      if (response.data.success) {
        setMovies(response.data.data.data);
        setTotalPages(response.data.data.last_page);
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(1);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />

      <main className="container mx-auto px-4 pt-24 pb-20">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Browse Movies</h1>

        {/* Filters */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Search movies..."
            value={search}
            onChange={handleSearchChange}
            className="px-4 py-3 bg-gray-900 rounded border border-gray-700 focus:border-red-600 focus:outline-none text-white"
          />

          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="px-4 py-3 bg-gray-900 rounded border border-gray-700 focus:border-red-600 focus:outline-none text-white"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={handleSortChange}
            className="px-4 py-3 bg-gray-900 rounded border border-gray-700 focus:border-red-600 focus:outline-none text-white"
          >
            <option value="created_at">Latest</option>
            <option value="rating">Rating</option>
            <option value="year">Year</option>
            <option value="title">Title</option>
          </select>
        </div>

        {/* Movies Grid */}
        {loading ? (
          <div className="text-center py-20">
            <div className="text-gray-400 text-xl">Loading movies...</div>
          </div>
        ) : movies.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-gray-400 text-xl">No movies found</div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-4 mt-12">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-6 py-2 bg-gray-800 hover:bg-gray-700 rounded disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  Previous
                </button>
                <span className="text-gray-400">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-6 py-2 bg-gray-800 hover:bg-gray-700 rounded disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Movies;