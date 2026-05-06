/**
 * Contact Page
 */
import { useState } from 'react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setForm({ name: '', email: '', message: '' });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16 px-4 transition-colors duration-300">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">Contact Us</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Have questions? Reach out to the Food4All team.
        </p>

        <div className="card">
          {submitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl text-green-600 dark:text-green-400">
                ✓
              </div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">Message Sent!</h3>
              <p className="text-gray-600 dark:text-gray-400">
                We'll get back to you as soon as possible.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Your name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="you@example.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  className="input-field min-h-[120px]"
                  placeholder="Your message..."
                  required
                />
              </div>
              <button type="submit" className="btn-primary w-full py-3">
                Send Message
              </button>
            </form>
          )}
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="card">
            <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">Email</h3>
            <p className="text-gray-600 dark:text-gray-400">support@food4all.com</p>
          </div>
          <div className="card">
            <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">Phone</h3>
            <p className="text-gray-600 dark:text-gray-400">+1 234 567 8900</p>
          </div>
        </div>
      </div>
    </div>
  );
}
