/**
 * NGO Dashboard
 */
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import Loading from '../../components/Loading';
import { useAuth } from '../../context/AuthContext';
import { requestAPI } from '../../api/services';

const ngoSidebarItems = [
  { path: '/ngo/dashboard', label: 'Dashboard', icon: '📊' },
  { path: '/ngo/available', label: 'Available Donations', icon: '🍽️' },
  { path: '/ngo/requested', label: 'Requested Donations', icon: '📋' },
];

export default function NGODashboard() {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await requestAPI.getAll();
        setRequests(res.data.data || []);
      } catch (err) {
        setRequests([]);
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  const pendingCount = requests.filter((r) => r.status === 'Pending').length;
  const collectedCount = requests.filter((r) => r.status === 'Collected').length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
        <Sidebar items={ngoSidebarItems} />
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">
            Welcome, {user?.name}
          </h1>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="card">
              <p className="text-gray-600 dark:text-gray-400 text-sm">Total Requests</p>
              <p className="text-2xl font-bold text-primary-600">{requests.length}</p>
            </div>
            <div className="card">
              <p className="text-gray-600 dark:text-gray-400 text-sm">Pending</p>
              <p className="text-2xl font-bold text-amber-600">{pendingCount}</p>
            </div>
            <div className="card">
              <p className="text-gray-600 dark:text-gray-400 text-sm">Collected</p>
              <p className="text-2xl font-bold text-green-600">{collectedCount}</p>
            </div>
            <div className="card">
              <Link to="/ngo/available" className="block">
                <p className="text-gray-600 dark:text-gray-400 text-sm">Browse Available</p>
                <p className="text-2xl font-bold text-secondary-600">→</p>
              </Link>
            </div>
          </div>

          {/* Recent Requests */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Recent Requests</h2>
              <Link to="/ngo/available" className="btn-primary text-sm">
                Browse Donations
              </Link>
            </div>

            {loading ? (
              <Loading />
            ) : requests.length === 0 ? (
              <div className="card text-center py-12">
                <p className="text-gray-600 dark:text-gray-400 mb-4">No requests yet. Browse available donations!</p>
                <Link to="/ngo/available" className="btn-primary">
                  Browse Donations
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {requests.slice(0, 5).map((req) => (
                  <div key={req._id} className="card flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold text-gray-800 dark:text-gray-100">
                        {req.donationId?.title || 'Donation'}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {req.donationId?.quantity} • {req.donationId?.location}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        req.status === 'Collected'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {req.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
