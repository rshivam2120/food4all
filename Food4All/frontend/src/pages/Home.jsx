/**
 * Home Page - Hero, About, How it Works
 */
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-500 via-primary-600 to-secondary-600 text-white py-24 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Fight Hunger. Reduce Waste.
          </h1>
          <p className="text-xl md:text-2xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Connect food donors with NGOs and shelters. Every meal matters.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register?role=donor"
              className="px-8 py-3 bg-white text-primary-600 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
            >
              I Want to Donate
            </Link>
            <Link
              to="/register?role=ngo"
              className="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              I'm an NGO
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 bg-white dark:bg-gray-800/50 transition-colors duration-300">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-12">
            About Food4All
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-4">
                Food4All is a platform that bridges the gap between food surplus and food scarcity.
                Restaurants, individuals, and event organizers can donate excess food to NGOs and
                shelters, reducing wastage while feeding those in need.
              </p>
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                Our mission is simple: connect donors who have food to give with organizations
                that can distribute it to people who need it most.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="card text-center">
                <span className="text-4xl font-bold text-primary-600">1000+</span>
                <p className="text-gray-600 dark:text-gray-400 mt-1">Meals Saved</p>
              </div>
              <div className="card text-center">
                <span className="text-4xl font-bold text-secondary-600">50+</span>
                <p className="text-gray-600 dark:text-gray-400 mt-1">Active NGOs</p>
              </div>
              <div className="card text-center col-span-2">
                <span className="text-4xl font-bold text-primary-500">24/7</span>
                <p className="text-gray-600 dark:text-gray-400 mt-1">Food Redistribution</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-12">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/50 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl text-primary-600 dark:text-primary-400">
                1
              </div>
              <h3 className="font-semibold text-lg mb-2 text-gray-800 dark:text-gray-100">Donors List Food</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Donors create listings with food details, quantity, location, and pickup time.
              </p>
            </div>
            <div className="card text-center">
              <div className="w-16 h-16 bg-secondary-100 dark:bg-secondary-900/50 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl text-secondary-600 dark:text-secondary-400">
                2
              </div>
              <h3 className="font-semibold text-lg mb-2 text-gray-800 dark:text-gray-100">NGOs Request</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                NGOs browse available donations and submit pickup requests.
              </p>
            </div>
            <div className="card text-center">
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/50 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl text-primary-600 dark:text-primary-400">
                3
              </div>
              <h3 className="font-semibold text-lg mb-2 text-gray-800 dark:text-gray-100">Food Distributed</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                NGOs collect the food and distribute it to those in need.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary-600 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Make a Difference?</h2>
          <p className="text-primary-100 mb-8">
            Join Food4All today and help reduce food waste while feeding those in need.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="px-8 py-3 bg-white text-primary-600 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
            >
              Get Started
            </Link>
            <Link
              to="/contact"
              className="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
