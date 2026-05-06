/**
 * Footer Component
 */
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-black text-gray-300 mt-auto border-t border-gray-800 dark:border-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Food4All</h3>
            <p className="text-sm">
              Connecting food donors with NGOs to reduce food wastage and feed those in need.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Get Started</h4>
            <ul className="space-y-2">
              <li><Link to="/register" className="hover:text-white transition-colors">Register as Donor</Link></li>
              <li><Link to="/register" className="hover:text-white transition-colors">Register as NGO</Link></li>
              <li><Link to="/login" className="hover:text-white transition-colors">Login</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <p className="text-sm">support@food4all.com</p>
            <p className="text-sm">+91 859568484</p>
          </div>
        </div>
        <div className="border-t border-gray-800 dark:border-gray-900 mt-8 pt-8 text-center text-sm">
          &copy; {new Date().getFullYear()} Food4All. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
