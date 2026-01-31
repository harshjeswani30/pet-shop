'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Users, Store, Package, DollarSign, TrendingUp, Shield, MessageSquare } from 'lucide-react';

interface AdminStats {
  totalUsers: number;
  totalSellers: number;
  activeListings: number;
  totalRevenue: number;
  pendingVerifications: number;
  supportTickets: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchStats = async () => {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        router.push('/auth/login');
        return;
      }

      // Mock data for now
      setStats({
        totalUsers: 1250,
        totalSellers: 85,
        activeListings: 420,
        totalRevenue: 2500000,
        pendingVerifications: 12,
        supportTickets: 8,
      });
      setLoading(false);
    };

    fetchStats();
  }, [router]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-gray-900 text-white">
        <div className="p-6">
          <h1 className="text-xl font-bold flex items-center">
            <Shield className="h-6 w-6 mr-2" /> Admin Panel
          </h1>
        </div>
        <nav className="mt-6 px-4 space-y-2">
          <Link href="/dashboard/admin" className="flex items-center px-4 py-3 bg-gray-800 rounded-lg font-medium">
            <TrendingUp className="h-5 w-5 mr-3" /> Dashboard
          </Link>
          <Link href="/dashboard/admin/users" className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 rounded-lg font-medium">
            <Users className="h-5 w-5 mr-3" /> Users
          </Link>
          <Link href="/dashboard/admin/sellers" className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 rounded-lg font-medium">
            <Store className="h-5 w-5 mr-3" /> Sellers
          </Link>
          <Link href="/dashboard/admin/listings" className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 rounded-lg font-medium">
            <Package className="h-5 w-5 mr-3" /> Listings
          </Link>
          <Link href="/dashboard/admin/analytics" className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 rounded-lg font-medium">
            <TrendingUp className="h-5 w-5 mr-3" /> Analytics
          </Link>
          <Link href="/dashboard/admin/support" className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 rounded-lg font-medium">
            <MessageSquare className="h-5 w-5 mr-3" /> Support
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Admin Dashboard</h2>
          <p className="text-gray-600">Platform overview and management</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{stats?.totalUsers.toLocaleString()}</h3>
            <p className="text-gray-600">Total Users</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Store className="h-6 w-6 text-green-600" />
              </div>
              <span className="text-sm text-orange-600 font-medium">{stats?.pendingVerifications} Pending</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{stats?.totalSellers}</h3>
            <p className="text-gray-600">Total Sellers</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Package className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{stats?.activeListings}</h3>
            <p className="text-gray-600">Active Listings</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">₹{stats?.totalRevenue.toLocaleString()}</h3>
            <p className="text-gray-600">Total Revenue</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Shield className="h-6 w-6 text-orange-600" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{stats?.pendingVerifications}</h3>
            <p className="text-gray-600">Pending Verifications</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 bg-red-100 rounded-lg flex items-center justify-center">
                <MessageSquare className="h-6 w-6 text-red-600" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{stats?.supportTickets}</h3>
            <p className="text-gray-600">Open Support Tickets</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/dashboard/admin/sellers" className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
              <Shield className="h-5 w-5 text-orange-600 mr-3" />
              <span className="font-medium text-gray-900">Review Verifications</span>
            </Link>
            <Link href="/dashboard/admin/users" className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
              <Users className="h-5 w-5 text-blue-600 mr-3" />
              <span className="font-medium text-gray-900">Manage Users</span>
            </Link>
            <Link href="/dashboard/admin/support" className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
              <MessageSquare className="h-5 w-5 text-red-600 mr-3" />
              <span className="font-medium text-gray-900">View Support Tickets</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
