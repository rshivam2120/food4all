/**
 * Donor Dashboard
 */
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import DonationCard from '../../components/DonationCard';
import Loading from '../../components/Loading';
import { useAuth } from '../../context/AuthContext';
import { donationAPI } from '../../api/services';

const donorSidebarItems = [
  { path: '/donor/dashboard', label: 'Dashboard', icon: '📊' },
  { path: '/donor/create', label: 'Create Donation', icon: '➕' },
  { path: '/donor/history', label: 'Donation History', icon: '📋' },
];

export default function DonorDashboard() {
  const { user } = useAuth();
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const res = await donationAPI.getAll();
        setDonations(res.data.data || []);
      } catch (err) {
        setDonations([]);
      } finally {
        setLoading(false);
      }
    };
    fetchDonations();
  }, []);

  const pendingCount = donations.filter((d) => d.status === 'Pending').length;
  const acceptedCount = donations.filter((d) => d.status === 'Accepted').length;
  const completedCount = donations.filter((d) => d.status === 'Completed').length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
        <Sidebar items={donorSidebarItems} />
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">
            Welcome, {user?.name}
          </h1>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="card">
              <p className="text-gray-600 dark:text-gray-400 text-sm">Total Donations</p>
              <p className="text-2xl font-bold text-primary-600">{donations.length}</p>
            </div>
            <div className="card">
              <p className="text-gray-600 dark:text-gray-400 text-sm">Pending</p>
              <p className="text-2xl font-bold text-amber-600">{pendingCount}</p>
            </div>
            <div className="card">
              <p className="text-gray-600 dark:text-gray-400 text-sm">Accepted</p>
              <p className="text-2xl font-bold text-blue-600">{acceptedCount}</p>
            </div>
            <div className="card">
              <p className="text-gray-600 dark:text-gray-400 text-sm">Completed</p>
              <p className="text-2xl font-bold text-green-600">{completedCount}</p>
            </div>
          </div>

          {/* Recent Donations */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Recent Donations</h2>
              <Link to="/donor/create" className="btn-primary text-sm">
                Create Donation
              </Link>
            </div>

            {loading ? (
              <Loading />
            ) : donations.length === 0 ? (
              <div className="card text-center py-12">
                <p className="text-gray-600 dark:text-gray-400 mb-4">No donations yet. Create your first donation!</p>
                <Link to="/donor/create" className="btn-primary">
                  Create Donation
                </Link>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {donations.slice(0, 6).map((donation) => (
                  <DonationCard key={donation._id} donation={donation} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
