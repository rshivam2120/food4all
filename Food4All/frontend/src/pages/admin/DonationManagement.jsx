/**
 * Admin - Donation Management (view all donations)
 */
import { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import Loading from '../../components/Loading';
import { donationAPI } from '../../api/services';

const adminSidebarItems = [
  { path: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
  { path: '/admin/users', label: 'User Management', icon: '👥' },
  { path: '/admin/donations', label: 'Donation Management', icon: '📦' },
];

export default function DonationManagement() {
  const [donations, setDonations] = useState([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        setLoading(true);
        const params = filter ? { status: filter } : {};
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

  const formatDate = (date) => (date ? new Date(date).toLocaleString() : '-');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
        <Sidebar items={adminSidebarItems} />
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">Donation Management</h1>

          {/* Filter */}
          <div className="flex gap-2 mb-6">
            {['', 'Pending', 'Accepted', 'Completed'].map((f) => (
              <button
                key={f || 'all'}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === f ? 'bg-primary-600 text-white' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-primary-50 dark:hover:bg-gray-700'
                }`}
              >
                {f || 'All'}
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
            <div className="overflow-x-auto">
              <table className="w-full card">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left p-4 font-semibold text-gray-800 dark:text-gray-100">Title</th>
                    <th className="text-left p-4 font-semibold text-gray-800 dark:text-gray-100">Quantity</th>
                    <th className="text-left p-4 font-semibold text-gray-800 dark:text-gray-100">Location</th>
                    <th className="text-left p-4 font-semibold text-gray-800 dark:text-gray-100">Donor</th>
                    <th className="text-left p-4 font-semibold text-gray-800 dark:text-gray-100">Status</th>
                    <th className="text-left p-4 font-semibold text-gray-800 dark:text-gray-100">Pickup Time</th>
                  </tr>
                </thead>
                <tbody>
                  {donations.map((donation) => (
                    <tr key={donation._id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
                      <td className="p-4 text-gray-800 dark:text-gray-100 font-medium">{donation.title}</td>
                      <td className="p-4 text-gray-600 dark:text-gray-400">{donation.quantity}</td>
                      <td className="p-4 text-gray-600 dark:text-gray-400">{donation.location}</td>
                      <td className="p-4 text-gray-600 dark:text-gray-400">
                        {donation.donorId?.name || 'N/A'}
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            donation.status === 'Completed'
                              ? 'bg-green-100 text-green-800'
                              : donation.status === 'Accepted'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {donation.status}
                        </span>
                      </td>
                      <td className="p-4 text-gray-600 dark:text-gray-400 text-sm">
                        {formatDate(donation.pickupTime)}
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
