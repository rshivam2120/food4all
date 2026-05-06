/**
 * Admin Dashboard - Stats and overview
 */
import { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import Sidebar from '../../components/Sidebar';
import Loading from '../../components/Loading';
import { adminAPI } from '../../api/services';

ChartJS.register(ArcElement, Tooltip, Legend);

const adminSidebarItems = [
  { path: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
  { path: '/admin/users', label: 'User Management', icon: '👥' },
  { path: '/admin/donations', label: 'Donation Management', icon: '📦' },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await adminAPI.getStats();
        setStats(res.data.data);
      } catch (err) {
        setStats(null);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const chartData = stats
    ? {
        labels: ['Completed', 'Pending', 'Accepted'],
        datasets: [
          {
            data: [stats.completedDonations, stats.pendingDonations, stats.acceptedDonations],
            backgroundColor: ['#10b981', '#f59e0b', '#3b82f6'],
            borderWidth: 0,
          },
        ],
      }
    : null;

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: { position: 'bottom' },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
        <Sidebar items={adminSidebarItems} />
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">Admin Dashboard</h1>

          {loading ? (
            <Loading />
          ) : stats ? (
            <>
              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="card">
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Total Donations</p>
                  <p className="text-2xl font-bold text-primary-600">{stats.totalDonations}</p>
                </div>
                <div className="card">
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Total Donors</p>
                  <p className="text-2xl font-bold text-secondary-600">{stats.totalDonors}</p>
                </div>
                <div className="card">
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Total NGOs</p>
                  <p className="text-2xl font-bold text-secondary-600">{stats.totalNgos}</p>
                </div>
                <div className="card">
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Completed</p>
                  <p className="text-2xl font-bold text-green-600">{stats.completedDonations}</p>
                </div>
              </div>

              {/* Chart */}
              <div className="card mb-8">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Donation Status</h2>
                <div className="max-w-xs mx-auto">
                  {chartData && <Doughnut data={chartData} options={chartOptions} />}
                </div>
              </div>

              {/* Summary */}
              <div className="grid md:grid-cols-3 gap-4">
                <div className="card">
                  <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">Pending Donations</h3>
                  <p className="text-3xl font-bold text-amber-600">{stats.pendingDonations}</p>
                </div>
                <div className="card">
                  <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">Accepted Donations</h3>
                  <p className="text-3xl font-bold text-blue-600">{stats.acceptedDonations}</p>
                </div>
                <div className="card">
                  <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">Active Users</h3>
                  <p className="text-3xl font-bold text-primary-600">
                    {stats.totalDonors + stats.totalNgos}
                  </p>
                </div>
              </div>
            </>
          ) : (
            <div className="card text-center py-12">
              <p className="text-gray-600 dark:text-gray-400">Unable to load statistics.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
