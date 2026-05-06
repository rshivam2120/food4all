/**
 * Available Donations Page - NGO only (Pending donations)
 */
import { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import DonationCard from '../../components/DonationCard';
import Loading from '../../components/Loading';
import { donationAPI, requestAPI } from '../../api/services';

const ngoSidebarItems = [
  { path: '/ngo/dashboard', label: 'Dashboard', icon: '📊' },
  { path: '/ngo/available', label: 'Available Donations', icon: '🍽️' },
  { path: '/ngo/requested', label: 'Requested Donations', icon: '📋' },
];

export default function AvailableDonations() {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [requesting, setRequesting] = useState(null);

  const fetchDonations = async () => {
    try {
      setLoading(true);
      const res = await donationAPI.getAll({ status: 'Pending' });
      setDonations(res.data.data || []);
    } catch (err) {
      setDonations([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  const handleRequest = async (donationId) => {
    setRequesting(donationId);
    setError('');
    try {
      await requestAPI.create({ donationId });
      setDonations((prev) => prev.filter((d) => d._id !== donationId));
    } catch (err) {
      setError(err.response?.data?.message || 'Request failed');
    } finally {
      setRequesting(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
        <Sidebar items={ngoSidebarItems} />
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">Available Donations</h1>

          {error && (
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-xl text-sm">{error}</div>
          )}

          {loading ? (
            <Loading />
          ) : donations.length === 0 ? (
            <div className="card text-center py-12">
              <p className="text-gray-600 dark:text-gray-400">No available donations at the moment.</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Check back later for new listings.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {donations.map((donation) => (
                <DonationCard
                  key={donation._id}
                  donation={donation}
                  showActions
                  onRequest={handleRequest}
                  isRequesting={requesting === donation._id}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
