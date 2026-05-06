/**
 * Donation History Page - Donor only
 */
import { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import DonationCard from '../../components/DonationCard';
import Loading from '../../components/Loading';
import { donationAPI } from '../../api/services';

const donorSidebarItems = [
  { path: '/donor/dashboard', label: 'Dashboard', icon: '📊' },
  { path: '/donor/create', label: 'Create Donation', icon: '➕' },
  { path: '/donor/history', label: 'Donation History', icon: '📋' },
];

export default function DonationHistory() {
  const [donations, setDonations] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const params = filter !== 'all' ? { status: filter } : {};
        const res = await donationAPI.getAll(params);
        setDonations(res.data.data || []);
      } catch (err) {
        setDonations([]);
      } finally {
        setLoading(false);
      }
    };
    fetchDonations();
  }, [filter]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
        <Sidebar items={donorSidebarItems} />
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">Donation History</h1>

          {/* Filter */}
          <div className="flex gap-2 mb-6">
            {['all', 'Pending', 'Accepted', 'Completed'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === f ? 'bg-primary-600 text-white' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-primary-50 dark:hover:bg-gray-700'
                }`}
              >
                {f === 'all' ? 'All' : f}
              </button>
            ))}
          </div>

          {loading ? (
            <Loading />
          ) : donations.length === 0 ? (
            <div className="card text-center py-12">
              <p className="text-gray-600 dark:text-gray-400">No donations found.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {donations.map((donation) => (
                <DonationCard key={donation._id} donation={donation} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
