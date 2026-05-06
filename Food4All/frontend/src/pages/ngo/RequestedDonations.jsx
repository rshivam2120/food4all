/**
 * Requested Donations Page - NGO only (donations they requested)
 */
import { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import Loading from '../../components/Loading';
import { requestAPI } from '../../api/services';

const ngoSidebarItems = [
  { path: '/ngo/dashboard', label: 'Dashboard', icon: '📊' },
  { path: '/ngo/available', label: 'Available Donations', icon: '🍽️' },
  { path: '/ngo/requested', label: 'Requested Donations', icon: '📋' },
];

export default function RequestedDonations() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [marking, setMarking] = useState(null);

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

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleMarkCollected = async (requestId) => {
    setMarking(requestId);
    try {
      await requestAPI.updateStatus(requestId, 'Collected');
      fetchRequests();
    } catch (err) {
      console.error(err);
    } finally {
      setMarking(null);
    }
  };

  const formatDate = (date) => new Date(date).toLocaleString();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
        <Sidebar items={ngoSidebarItems} />
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">Requested Donations</h1>

          {loading ? (
            <Loading />
          ) : requests.length === 0 ? (
            <div className="card text-center py-12">
              <p className="text-gray-600 dark:text-gray-400">No requested donations yet.</p>
              <a href="/ngo/available" className="btn-primary inline-block mt-4">
                Browse Available
              </a>
            </div>
          ) : (
            <div className="space-y-4">
              {requests.map((req) => (
                <div key={req._id} className="card">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                        {req.donationId?.title}
                      </h3>
                      {req.donationId?.description && (
                        <p className="text-gray-600 dark:text-gray-400 text-sm mt-1 line-clamp-2">
                          {req.donationId.description}
                        </p>
                      )}
                      <div className="mt-2 text-sm text-gray-600 dark:text-gray-400 space-y-1">
                        <p><span className="font-medium">Quantity:</span> {req.donationId?.quantity}</p>
                        <p><span className="font-medium">Location:</span> {req.donationId?.location}</p>
                        <p><span className="font-medium">Pickup:</span> {formatDate(req.donationId?.pickupTime)}</p>
                        <p><span className="font-medium">Donor:</span> {req.donationId?.donorId?.name || 'N/A'}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          req.status === 'Collected'
                            ? 'bg-green-100 text-green-800'
                            : req.status === 'Accepted'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {req.status}
                      </span>
                      {req.status !== 'Collected' && req.donationId?.status === 'Accepted' && (
                        <button
                          onClick={() => handleMarkCollected(req._id)}
                          disabled={marking === req._id}
                          className="btn-primary mt-2 text-sm disabled:opacity-50"
                        >
                          {marking === req._id ? 'Marking...' : 'Mark as Collected'}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
