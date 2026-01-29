import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { movieService } from '../services/api';

const Home = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTrendingMovies();
  }, []);

  const fetchTrendingMovies = async () => {
    try {
      const response = await movieService.getTrending();
      if (response.data.success) {
        setTrendingMovies(response.data.data.slice(0, 5));
      }
    } catch (error) {
      console.error('Error fetching trending movies:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img
            src="https://assets.nflxext.com/ffe/siteui/vlv3/6fd9d446-cd78-453a-8c9c-417ed3e00422/web/ID-id-20251117-TRIFECTA-perspective_732255c5-8270-4596-8359-bcc9cf26985e_medium.jpg"
            alt="Hero Background"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4">
            Unlimited movies, TV shows, and more
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl mb-6 text-gray-300">
            Watch anywhere. Cancel anytime.
          </p>
          <Link
            to="/movies"
            className="inline-block bg-red-600 hover:bg-red-700 px-6 md:px-8 py-3 rounded text-base md:text-lg font-semibold transition"
          >
            Explore Movies
          </Link>
        </div>
      </section>

      {/* Trending Movies */}
      <main className="container mx-auto px-4 pb-20 -mt-32 relative z-20">
        <section className="mb-16">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-6">
            Sedang Tren Sekarang
          </h2>
          
          {loading ? (
            <div className="text-center py-20">
              <div className="text-gray-400">Loading trending movies...</div>
            </div>
          ) : (
            <div className="relative">
              <div className="flex overflow-x-auto space-x-2 md:space-x-4 pb-4 scrollbar-hide">
                {trendingMovies.map((movie, index) => (
                  <Link
                    key={movie.id}
                    to={`/movies/${movie.id}`}
                    className="flex-shrink-0 relative group"
                  >
                    <div
                      className="text-8xl md:text-9xl font-black text-transparent absolute -left-4 md:-left-6 bottom-0 z-10"
                      style={{
                        textShadow:
                          '-2px 0 0 #fff, 2px 0 0 #fff, 0 -2px 0 #fff, 0 2px 0 #fff',
                        WebkitTextStroke: '2px #fff',
                      }}
                    >
                      {index + 1}
                    </div>
                    <img
                      className="w-32 md:w-48 h-48 md:h-72 object-cover rounded ml-6 md:ml-10 group-hover:scale-105 transition cursor-pointer"
                      src={movie.poster_url || 'https://via.placeholder.com/300x450'}
                      alt={movie.title}
                    />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Reasons to Join */}
        <section className="mb-16">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-6">
            Alasan Lainnya untuk Bergabung
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 p-6 rounded-lg border border-gray-800 hover:border-gray-600 transition">
              <h3 className="text-lg font-bold mb-3">Nikmati di TV-mu</h3>
              <p className="text-sm text-gray-300 mb-6">
                Tonton di Smart TV, Playstation, Xbox, Chromecast, Apple TV, pemutar
                Blu-ray, dan banyak lagi.
              </p>
              <div className="flex justify-center">
                <svg
                  className="w-16 h-16 text-purple-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>

            <div className="bg-gradient-to-br from-pink-900/30 to-red-900/30 p-6 rounded-lg border border-gray-800 hover:border-gray-600 transition">
              <h3 className="text-lg font-bold mb-3">
                Download serial untuk menontonnya secara offline
              </h3>
              <p className="text-sm text-gray-300 mb-6">
                Simpan favoritmu dengan mudah agar selalu ada acara TV dan film yang
                bisa ditonton.
              </p>
              <div className="flex justify-center">
                <svg
                  className="w-16 h-16 text-pink-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
              </div>
            </div>

            <div className="bg-gradient-to-br from-red-900/30 to-orange-900/30 p-6 rounded-lg border border-gray-800 hover:border-gray-600 transition">
              <h3 className="text-lg font-bold mb-3">Tonton di mana pun</h3>
              <p className="text-sm text-gray-300 mb-6">
                Streaming film dan serial TV tanpa batas di ponsel, tablet, laptop, dan
                TV-mu.
              </p>
              <div className="flex justify-center">
                <svg
                  className="w-16 h-16 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 p-6 rounded-lg border border-gray-800 hover:border-gray-600 transition">
              <h3 className="text-lg font-bold mb-3">Buat profil untuk anak</h3>
              <p className="text-sm text-gray-300 mb-6">
                Kirim anak-anak untuk bertualang bersama karakter favorit di dunia yang
                dibuat khusus untuk mereka — gratis dengan keanggotaanmu.
              </p>
              <div className="flex justify-center">
                <svg
                  className="w-16 h-16 text-cyan-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;