import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { authService } from '../services/api';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await authService.getUsers();
      if (response.data.success) {
        setUsers(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />

      <main className="container mx-auto px-4 pt-24 pb-20">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">All Users</h1>

        {loading ? (
          <div className="text-center py-20">
            <div className="text-gray-400 text-xl">Loading users...</div>
          </div>
        ) : users.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-gray-400 text-xl">No users found</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map((user) => (
              <Link
                key={user.id}
                to={`/users/${user.id}`}
                className="bg-gray-900 border border-gray-800 hover:border-gray-600 rounded-lg p-6 transition"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-2xl font-bold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-1">{user.name}</h3>
                    <p className="text-gray-400 text-sm">{user.email}</p>
                  </div>
                </div>
                <div className="mt-4 text-sm text-gray-500">
                  Joined: {new Date(user.created_at).toLocaleDateString()}
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Users;