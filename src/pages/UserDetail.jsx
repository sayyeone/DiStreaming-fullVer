import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { authService } from '../services/api';

const UserDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUser();
  }, [id]);

  const fetchUser = async () => {
    try {
      const response = await authService.getUserById(id);
      if (response.data.success) {
        setUser(response.data.data);
      }
    } catch (err) {
      setError('User not found');
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

  if (error || !user) {
    return (
      <div className="bg-black text-white min-h-screen">
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-screen">
          <div className="text-xl mb-4">{error || 'User not found'}</div>
          <Link to="/users" className="text-red-600 hover:underline">
            Back to Users
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />

      <main className="container mx-auto px-4 pt-24 pb-20">
        <div className="max-w-2xl mx-auto">
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-8">
            <div className="flex items-center space-x-6 mb-8">
              <div className="w-24 h-24 bg-red-600 rounded-full flex items-center justify-center text-4xl font-bold">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
                <p className="text-gray-400">{user.email}</p>
              </div>
            </div>

            <div className="space-y-4 border-t border-gray-800 pt-6">
              <div>
                <span className="text-gray-400">User ID:</span>
                <span className="ml-4 text-white">{user.id}</span>
              </div>
              <div>
                <span className="text-gray-400">Name:</span>
                <span className="ml-4 text-white">{user.name}</span>
              </div>
              <div>
                <span className="text-gray-400">Email:</span>
                <span className="ml-4 text-white">{user.email}</span>
              </div>
              <div>
                <span className="text-gray-400">Joined:</span>
                <span className="ml-4 text-white">
                  {new Date(user.created_at).toLocaleDateString('id-ID', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>
              <div>
                <span className="text-gray-400">Last Updated:</span>
                <span className="ml-4 text-white">
                  {new Date(user.updated_at).toLocaleDateString('id-ID', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-800">
              <Link
                to="/users"
                className="inline-block bg-red-600 hover:bg-red-700 px-6 py-3 rounded font-semibold transition"
              >
                ← Back to Users
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default UserDetail;