/**
 * Create Donation Page - Donor only
 */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import { donationAPI } from '../../api/services';

const donorSidebarItems = [
  { path: '/donor/dashboard', label: 'Dashboard', icon: '📊' },
  { path: '/donor/create', label: 'Create Donation', icon: '➕' },
  { path: '/donor/history', label: 'Donation History', icon: '📋' },
];

export default function CreateDonation() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    description: '',
    quantity: '',
    location: '',
    pickupTime: '',
    contactInfo: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = {
        ...form,
        pickupTime: new Date(form.pickupTime).toISOString(),
      };
      await donationAPI.create(data);
      navigate('/donor/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create donation');
    } finally {
      setLoading(false);
    }
  };

  const minDate = new Date().toISOString().slice(0, 16);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 transition-colors duration-300">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-8">
        <Sidebar items={donorSidebarItems} />
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">Create Donation</h1>

          <div className="card">
            {error && (
              <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-xl text-sm">{error}</div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Food Title *</label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="e.g. Fresh vegetables"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  className="input-field min-h-[80px]"
                  placeholder="Describe the food..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Quantity *</label>
                <input
                  type="text"
                  name="quantity"
                  value={form.quantity}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="e.g. 10 kg, 5 plates"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Location *</label>
                <input
                  type="text"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Pickup address"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Pickup Time *</label>
                <input
                  type="datetime-local"
                  name="pickupTime"
                  value={form.pickupTime}
                  onChange={handleChange}
                  className="input-field"
                  min={minDate}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Contact Info</label>
                <input
                  type="text"
                  name="contactInfo"
                  value={form.contactInfo}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Phone or email for pickup"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="btn-primary py-3 px-6 disabled:opacity-50"
              >
                {loading ? 'Creating...' : 'Create Donation'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
