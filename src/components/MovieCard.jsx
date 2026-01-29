import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  return (
    <Link to={`/movies/${movie.id}`}>
      <div className="group relative cursor-pointer">
        <img
          src={movie.poster_url || 'https://via.placeholder.com/300x450?text=No+Image'}
          alt={movie.title}
          className="w-full h-64 md:h-80 object-cover rounded transition-transform group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded">
          <div className="absolute bottom-0 p-4 w-full">
            <h3 className="font-bold text-white text-lg mb-1">{movie.title}</h3>
            <div className="flex items-center space-x-2 text-sm">
              <span className="text-yellow-400">⭐ {movie.rating}</span>
              <span className="text-gray-300">{movie.year}</span>
            </div>
            {movie.rating_class && (
              <span className="inline-block mt-2 px-2 py-1 bg-red-600 text-white text-xs rounded">
                {movie.rating_class}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;