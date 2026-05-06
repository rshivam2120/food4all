/**
 * Navbar Component - Navigation bar with auth links & dark mode toggle
 */
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileOpen(false);
  };

  const linkClass = 'text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors block md:inline';
  const navLinks = (
    <>
      <Link to="/" className={linkClass} onClick={() => setMobileOpen(false)}>Home</Link>
      <Link to="/about" className={linkClass} onClick={() => setMobileOpen(false)}>About</Link>
      {isAuthenticated && user?.role === 'donor' && (
        <>
          <Link to="/donor/dashboard" className={linkClass} onClick={() => setMobileOpen(false)}>Dashboard</Link>
          <Link to="/donor/create" className={linkClass} onClick={() => setMobileOpen(false)}>Create</Link>
          <Link to="/donor/history" className={linkClass} onClick={() => setMobileOpen(false)}>History</Link>
        </>
      )}
      {isAuthenticated && user?.role === 'ngo' && (
        <>
          <Link to="/ngo/dashboard" className={linkClass} onClick={() => setMobileOpen(false)}>Dashboard</Link>
          <Link to="/ngo/available" className={linkClass} onClick={() => setMobileOpen(false)}>Available</Link>
          <Link to="/ngo/requested" className={linkClass} onClick={() => setMobileOpen(false)}>Requested</Link>
        </>
      )}
      {isAuthenticated && user?.role === 'admin' && (
        <>
          <Link to="/admin/dashboard" className={linkClass} onClick={() => setMobileOpen(false)}>Dashboard</Link>
          <Link to="/admin/users" className={linkClass} onClick={() => setMobileOpen(false)}>Users</Link>
          <Link to="/admin/donations" className={linkClass} onClick={() => setMobileOpen(false)}>Donations</Link>
        </>
      )}
      <Link to="/contact" className={linkClass} onClick={() => setMobileOpen(false)}>Contact</Link>
      {/* Dark mode toggle */}
      <button
        onClick={toggleTheme}
        className="p-2 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-amber-400 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200"
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        title={isDark ? 'Light mode' : 'Dark mode'}
      >
        {isDark ? (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        )}
      </button>
      {isAuthenticated ? (
        <div className="flex items-center gap-2 md:border-l md:pl-4 border-gray-200 dark:border-gray-600">
          <span className="text-sm text-gray-500 dark:text-gray-400 hidden sm:inline">{user?.name}</span>
          <span className="px-2 py-0.5 bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300 text-xs rounded-full">{user?.role}</span>
          <button onClick={handleLogout} className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 text-sm font-medium">
            Logout
          </button>
        </div>
      ) : (
        <>
          <Link to="/login" className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium" onClick={() => setMobileOpen(false)}>Login</Link>
          <Link to="/register" className="btn-primary" onClick={() => setMobileOpen(false)}>Register</Link>
        </>
      )}
    </>
  );

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg dark:shadow-gray-900/50 border-b border-gray-100 dark:border-gray-700 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">Food4All</span>
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-4">
            {navLinks}
          </div>

          {/* Mobile */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
              aria-label="Menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden py-4 space-y-3 border-t border-gray-100 dark:border-gray-700 flex flex-col">
            {navLinks}
          </div>
        )}
      </div>
    </nav>
  );
}
