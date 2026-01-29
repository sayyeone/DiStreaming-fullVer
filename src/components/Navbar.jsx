import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="fixed w-full z-50 bg-gradient-to-b from-black via-black/80 to-transparent">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-red-600 text-2xl md:text-3xl font-bold">
          DiNetfliks
        </Link>
        
        <ul className="hidden md:flex space-x-6 text-sm">
          <li>
            <Link to="/" className="hover:text-gray-300 transition">
              Home
            </Link>
          </li>
          <li>
            <Link to="/movies" className="hover:text-gray-300 transition">
              Movies
            </Link>
          </li>
          {user && (
            <li>
              <Link to="/users" className="hover:text-gray-300 transition">
                Users
              </Link>
            </li>
          )}
        </ul>

        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <span className="text-sm hidden md:inline">
                Hi, {user.name}
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 px-4 md:px-6 py-2 rounded text-sm transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="bg-red-600 hover:bg-red-700 px-4 md:px-6 py-2 rounded text-sm transition"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;