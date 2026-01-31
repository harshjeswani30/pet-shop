'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Package, ShoppingBag, MessageSquare, Star, TrendingUp, Plus, DollarSign } from 'lucide-react';

interface DashboardStats {
  totalListings: number;
  activeListings: number;
  totalSales: number;
  totalRevenue: number;
  unreadMessages: number;
  averageRating: number;
}

export default function SellerDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchStats = async () => {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        router.push('/auth/login');
        return;
      }

      try {
        // For now, use mock data. In production, fetch from API
        setStats({
          totalListings: 12,
          activeListings: 8,
          totalSales: 24,
          totalRevenue: 285000,
          unreadMessages: 3,
          averageRating: 4.8,
        });
      } catch {
        router.push('/auth/login');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [router]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg">
        <div className="p-6">
          <h1 className="text-xl font-bold text-gray-900">Seller Dashboard</h1>
        </div>
        <nav className="mt-6 px-4 space-y-2">
          <Link href="/dashboard/seller" className="flex items-center px-4 py-3 bg-primary-50 text-primary-700 rounded-lg font-medium">
            <TrendingUp className="h-5 w-5 mr-3" /> Overview
          </Link>
          <Link href="/dashboard/seller/listings" className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg font-medium">
            <Package className="h-5 w-5 mr-3" /> My Listings
          </Link>
          <Link href="/dashboard/seller/orders" className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg font-medium">
            <ShoppingBag className="h-5 w-5 mr-3" /> Orders
          </Link>
          <Link href="/dashboard/seller/messages" className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg font-medium">
            <MessageSquare className="h-5 w-5 mr-3" /> Messages
          </Link>
          <Link href="/dashboard/seller/reviews" className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg font-medium">
            <Star className="h-5 w-5 mr-3" /> Reviews
          </Link>
          <Link href="/dashboard/seller/analytics" className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg font-medium">
            <TrendingUp className="h-5 w-5 mr-3" /> Analytics
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
            <p className="text-gray-600">Welcome back! Here&apos;s what&apos;s happening with your store.</p>
          </div>
          <Link href="/dashboard/seller/listings/new" className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
            <Plus className="h-5 w-5 mr-2" /> Add New Pet
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <Package className="h-6 w-6 text-primary-600" />
              </div>
              <span className="text-sm text-green-600 font-medium">{stats?.activeListings} Active</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{stats?.totalListings}</h3>
            <p className="text-gray-600">Total Listings</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 bg-accent-100 rounded-lg flex items-center justify-center">
                <ShoppingBag className="h-6 w-6 text-accent-600" />
              </div>
              <span className="text-sm text-accent-600 font-medium">Total</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{stats?.totalSales}</h3>
            <p className="text-gray-600">Sales Made</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-yellow-600" />
              </div>
              <span className="text-sm text-green-600 font-medium">Revenue</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">₹{stats?.totalRevenue.toLocaleString()}</h3>
            <p className="text-gray-600">Total Revenue</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Link href="/dashboard/seller/listings/new" className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                <Plus className="h-5 w-5 text-primary-600 mr-3" />
                <span className="font-medium text-gray-900">Add New Listing</span>
              </Link>
              <Link href="/dashboard/seller/messages" className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                <MessageSquare className="h-5 w-5 text-primary-600 mr-3" />
                <span className="font-medium text-gray-900">View Messages {stats?.unreadMessages ? `(${stats.unreadMessages} new)` : ''}</span>
              </Link>
              <Link href="/dashboard/seller/reviews" className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                <Star className="h-5 w-5 text-primary-600 mr-3" />
                <span className="font-medium text-gray-900">Check Reviews ({stats?.averageRating} ★)</span>
              </Link>
            </div>
          </div>

          <div className="bg-gradient-to-br from-primary-600 to-primary-700 p-6 rounded-xl text-white">
            <h3 className="text-lg font-bold mb-2">Get Verified</h3>
            <p className="text-primary-100 mb-4">Complete your verification to unlock all seller features and build trust with buyers.</p>
            <Link href="/dashboard/seller/verification" className="inline-flex items-center px-4 py-2 bg-white text-primary-600 rounded-lg font-medium hover:bg-gray-100">
              Start Verification
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
