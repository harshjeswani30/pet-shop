'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Heart, Menu, X, PawPrint, User, ShoppingBag } from 'lucide-react';

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop/all?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <nav className="bg-white border-b sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <PawPrint className="h-8 w-8 text-primary-600" />
              <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">PetCompanion</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/shop" className="text-gray-600 hover:text-primary-600 font-medium transition">Shop</Link>
            <Link href="/shop/new-arrivals" className="text-gray-600 hover:text-primary-600 font-medium transition">New Arrivals</Link>
            <Link href="/blog" className="text-gray-600 hover:text-primary-600 font-medium transition">Blog</Link>
            <Link href="/about" className="text-gray-600 hover:text-primary-600 font-medium transition">About</Link>
            <Link href="/contact" className="text-gray-600 hover:text-primary-600 font-medium transition">Contact</Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search pets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 w-48 transition-all focus:w-64"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </form>
            <Link href="/my-favorites" className="text-gray-600 hover:text-primary-600 transition p-2 hover:bg-gray-100 rounded-full">
              <Heart className="h-5 w-5" />
            </Link>
            <Link href="/my-orders" className="text-gray-600 hover:text-primary-600 transition p-2 hover:bg-gray-100 rounded-full">
              <ShoppingBag className="h-5 w-5" />
            </Link>
            <Link href="/auth/login" className="text-gray-600 hover:text-primary-600 transition p-2 hover:bg-gray-100 rounded-full">
              <User className="h-5 w-5" />
            </Link>
            <Link href="/auth/register" className="bg-primary-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-primary-700 transition">
              Sign Up
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <Link href="/auth/login" className="text-gray-600 hover:text-primary-600 p-2">
              <User className="h-6 w-6" />
            </Link>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600 hover:text-gray-900 p-2">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-4 space-y-2">
            <form onSubmit={handleSearch} className="relative mb-4">
              <input type="text" placeholder="Search pets..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </form>
            <Link href="/shop" className="block px-3 py-2 text-gray-600 hover:bg-primary-50 rounded-lg" onClick={() => setIsMenuOpen(false)}>Shop</Link>
            <Link href="/shop/new-arrivals" className="block px-3 py-2 text-gray-600 hover:bg-primary-50 rounded-lg" onClick={() => setIsMenuOpen(false)}>New Arrivals</Link>
            <Link href="/blog" className="block px-3 py-2 text-gray-600 hover:bg-primary-50 rounded-lg" onClick={() => setIsMenuOpen(false)}>Blog</Link>
            <Link href="/about" className="block px-3 py-2 text-gray-600 hover:bg-primary-50 rounded-lg" onClick={() => setIsMenuOpen(false)}>About</Link>
            <Link href="/contact" className="block px-3 py-2 text-gray-600 hover:bg-primary-50 rounded-lg" onClick={() => setIsMenuOpen(false)}>Contact</Link>
            <div className="border-t pt-2 mt-2">
              <Link href="/my-favorites" className="block px-3 py-2 text-gray-600 hover:bg-primary-50 rounded-lg" onClick={() => setIsMenuOpen(false)}>My Favorites</Link>
              <Link href="/my-orders" className="block px-3 py-2 text-gray-600 hover:bg-primary-50 rounded-lg" onClick={() => setIsMenuOpen(false)}>My Orders</Link>
              <Link href="/auth/login" className="block px-3 py-2 text-primary-600 font-medium hover:bg-primary-50 rounded-lg" onClick={() => setIsMenuOpen(false)}>Sign In</Link>
              <Link href="/auth/register" className="block px-3 py-2 text-primary-600 font-medium hover:bg-primary-50 rounded-lg" onClick={() => setIsMenuOpen(false)}>Create Account</Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
