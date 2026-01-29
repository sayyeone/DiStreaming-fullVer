import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { movieService } from '../services/api';

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMovie();
  }, [id]);

  const fetchMovie = async () => {
    try {
      const response = await movieService.getMovieById(id);
      if (response.data.success) {
        setMovie(response.data.data);
      }
    } catch (err) {
      setError('Movie not found');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-black text-white min-h-screen">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-xl">Loading...</div>
        </div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="bg-black text-white min-h-screen">
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-screen">
          <div className="text-xl mb-4">{error || 'Movie not found'}</div>
          <Link to="/movies" className="text-red-600 hover:underline">
            Back to Movies
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />

      <main className="pt-20">
        {/* Hero Section */}
        <div className="relative h-96 md:h-[600px]">
          <img
            src={movie.poster_url || 'https://via.placeholder.com/1920x1080'}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
        </div>

        {/* Movie Info */}
        <div className="container mx-auto px-4 -mt-32 relative z-10 pb-20">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">{movie.title}</h1>

            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="text-yellow-400 text-xl">⭐ {movie.rating}</span>
              <span className="text-gray-300">{movie.year}</span>
              {movie.duration && (
                <span className="text-gray-300">{movie.duration} min</span>
              )}
              {movie.rating_class && (
                <span className="px-3 py-1 bg-red-600 text-white text-sm rounded">
                  {movie.rating_class}
                </span>
              )}
              {movie.movie_category && (
                <span className="px-3 py-1 bg-gray-800 text-white text-sm rounded">
                  {movie.movie_category.name}
                </span>
              )}
            </div>

            {movie.description && (
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                {movie.description}
              </p>
            )}

            {movie.director && (
              <div className="mb-4">
                <span className="text-gray-400">Director: </span>
                <span className="text-white">{movie.director}</span>
              </div>
            )}

            {movie.cast && (
              <div className="mb-4">
                <span className="text-gray-400">Cast: </span>
                <span className="text-white">{movie.cast}</span>
              </div>
            )}

            <div className="mt-8">
              <Link
                to="/movies"
                className="inline-block bg-red-600 hover:bg-red-700 px-6 py-3 rounded font-semibold transition"
              >
                ← Back to Movies
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MovieDetail;