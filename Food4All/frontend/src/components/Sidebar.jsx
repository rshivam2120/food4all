/**
 * Sidebar Component - Dashboard sidebar navigation
 */
import { Link, useLocation } from 'react-router-dom';

export default function Sidebar({ items }) {
  const location = useLocation();

  return (
    <aside className="w-full md:w-64 bg-white dark:bg-gray-800 shadow-lg dark:shadow-gray-900/50 rounded-xl md:min-h-[calc(100vh-8rem)] p-4 border border-gray-100 dark:border-gray-700">
      <nav className="flex flex-row md:flex-col flex-wrap gap-2 md:gap-0 md:space-y-1">
        {items.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-2 md:py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-primary-600 dark:bg-primary-500 text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-primary-50 dark:hover:bg-gray-700 hover:text-primary-600 dark:hover:text-primary-400'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
