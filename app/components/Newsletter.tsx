'use client';

import { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      
      if (res.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <section className="bg-primary-600 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Stay Updated with New Arrivals</h2>
        <p className="text-primary-100 mb-8 max-w-2xl mx-auto">
          Subscribe to our newsletter and be the first to know about new pets, care tips, and exclusive offers.
        </p>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
          <input
            type="email"
            required
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-grow px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-300"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="px-6 py-3 bg-gray-900 text-white font-semibold rounded-md hover:bg-gray-800 transition disabled:opacity-50"
          >
            {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>
        {status === 'success' && <p className="mt-4 text-green-200">Thanks for subscribing!</p>}
        {status === 'error' && <p className="mt-4 text-red-200">Something went wrong. Please try again.</p>}
      </div>
    </section>
  );
}
