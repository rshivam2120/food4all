/**
 * Donation Card Component - Displays donation info
 */
import { Link } from 'react-router-dom';

export default function DonationCard({ donation, showActions = false, onRequest, onMarkCollected, isRequesting = false }) {
  const statusColors = {
    Pending: 'bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-300',
    Accepted: 'bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300',
    Completed: 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300',
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString();
  };

  return (
    <div className="card hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{donation.title}</h3>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[donation.status] || 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}>
          {donation.status}
        </span>
      </div>
      {donation.description && (
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-2 line-clamp-2">{donation.description}</p>
      )}
      <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
        <p><span className="font-medium">Quantity:</span> {donation.quantity}</p>
        <p><span className="font-medium">Location:</span> {donation.location}</p>
        <p><span className="font-medium">Pickup:</span> {formatDate(donation.pickupTime)}</p>
      </div>
      {donation.donorId?.name && (
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Donor: {donation.donorId.name}</p>
      )}
      {showActions && donation.status === 'Pending' && (
        <button
          onClick={() => onRequest?.(donation._id)}
          disabled={isRequesting}
          className="btn-primary w-full mt-4 disabled:opacity-50"
        >
          {isRequesting ? 'Requesting...' : 'Request Donation'}
        </button>
      )}
      {showActions && donation.status === 'Accepted' && onMarkCollected && (
        <button
          onClick={() => onMarkCollected?.(donation._id)}
          className="btn-primary w-full mt-4"
        >
          Mark as Collected
        </button>
      )}
      {!showActions && (
        <Link
          to={`/donor/donations/${donation._id}`}
          className="block text-primary-600 dark:text-primary-400 text-sm font-medium mt-3 hover:underline"
        >
          View Details →
        </Link>
      )}
    </div>
  );
}
