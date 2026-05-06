/**
 * Admin - User Management
 */
import { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import Loading from '../../components/Loading';
import { adminAPI } from '../../api/services';

const adminSidebarItems = [
  { path: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
  { path: '/admin/users', label: 'User Management', icon: '👥' },
  { path: '/admin/donations', label: 'Donation Management', icon: '📦' },
];

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [blocking, setBlocking] = useState(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const params = filter ? { role: filter } : {};
      const res = await adminAPI.getUsers(params);
      setUsers(res.data.data || []);
    } catch (err) {
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [filter]);

  const handleBlock = async (id) => {
    setBlocking(id);
    try {
      await adminAPI.blockUser(id);
      fetchUsers();
    } catch (err) {
      console.error(err);
    } finally {
      setBlocking(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
        <Sidebar items={adminSidebarItems} />
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">User Management</h1>

          {/* Filter */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setFilter('')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                !filter ? 'bg-primary-600 text-white' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-primary-50 dark:hover:bg-gray-700'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('donor')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'donor' ? 'bg-primary-600 text-white' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-primary-50 dark:hover:bg-gray-700'
              }`}
            >
              Donors
            </button>
            <button
              onClick={() => setFilter('ngo')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'ngo' ? 'bg-primary-600 text-white' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-primary-50 dark:hover:bg-gray-700'
              }`}
            >
              NGOs
            </button>
          </div>

          {loading ? (
            <Loading />
          ) : users.length === 0 ? (
            <div className="card text-center py-12">
              <p className="text-gray-600 dark:text-gray-400">No users found.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full card">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left p-4 font-semibold text-gray-800 dark:text-gray-100">Name</th>
                    <th className="text-left p-4 font-semibold text-gray-800 dark:text-gray-100">Email</th>
                    <th className="text-left p-4 font-semibold text-gray-800 dark:text-gray-100">Role</th>
                    <th className="text-left p-4 font-semibold text-gray-800 dark:text-gray-100">Status</th>
                    <th className="text-left p-4 font-semibold text-gray-800 dark:text-gray-100">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
                      <td className="p-4 text-gray-800 dark:text-gray-100">{user.name}</td>
                      <td className="p-4 text-gray-600 dark:text-gray-400">{user.email}</td>
                      <td className="p-4">
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                          {user.role}
                        </span>
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            user.isBlocked ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                          }`}
                        >
                          {user.isBlocked ? 'Blocked' : 'Active'}
                        </span>
                      </td>
                      <td className="p-4">
                        {user.role !== 'admin' && (
                          <button
                            onClick={() => handleBlock(user._id)}
                            disabled={blocking === user._id}
                            className={`text-sm font-medium disabled:opacity-50 ${
                              user.isBlocked ? 'text-green-600 hover:text-green-700' : 'text-red-600 hover:text-red-700'
                            }`}
                          >
                            {blocking === user._id ? '...' : user.isBlocked ? 'Unblock' : 'Block'}
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
