'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Heart, Menu, X, PawPrint } from 'lucide-react';

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
    <nav className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <PawPrint className="h-8 w-8 text-primary-600" />
              <span className="text-xl font-bold text-gray-900">PetMarket</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/shop" className="text-gray-600 hover:text-primary-600 font-medium">Shop</Link>
            <Link href="/shop/new-arrivals" className="text-gray-600 hover:text-primary-600 font-medium">New Arrivals</Link>
            <Link href="/blog" className="text-gray-600 hover:text-primary-600 font-medium">Blog</Link>
            <Link href="/about" className="text-gray-600 hover:text-primary-600 font-medium">About</Link>
            <Link href="/contact" className="text-gray-600 hover:text-primary-600 font-medium">Contact</Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search pets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </form>
            <Link href="/favorites" className="text-gray-600 hover:text-primary-600">
              <Heart className="h-6 w-6" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/shop" className="block px-3 py-2 text-gray-600 hover:bg-primary-50">Shop</Link>
            <Link href="/shop/new-arrivals" className="block px-3 py-2 text-gray-600 hover:bg-primary-50">New Arrivals</Link>
            <Link href="/blog" className="block px-3 py-2 text-gray-600 hover:bg-primary-50">Blog</Link>
            <Link href="/about" className="block px-3 py-2 text-gray-600 hover:bg-primary-50">About</Link>
            <Link href="/contact" className="block px-3 py-2 text-gray-600 hover:bg-primary-50">Contact</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
