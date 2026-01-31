import Link from 'next/link';
import { PawPrint, Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <PawPrint className="h-8 w-8 text-primary-400" />
              <span className="text-xl font-bold">PetMarket</span>
            </div>
            <p className="text-gray-400 mb-6">
              India's most trusted marketplace for healthy and happy pets. We ensure ethical breeding and top-notch care.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white"><Facebook className="h-5 w-5" /></a>
              <a href="#" className="text-gray-400 hover:text-white"><Twitter className="h-5 w-5" /></a>
              <a href="#" className="text-gray-400 hover:text-white"><Instagram className="h-5 w-5" /></a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li><Link href="/shop" className="text-gray-400 hover:text-white transition">Shop All Pets</Link></li>
              <li><Link href="/shop/new-arrivals" className="text-gray-400 hover:text-white transition">New Arrivals</Link></li>
              <li><Link href="/blog" className="text-gray-400 hover:text-white transition">Pet Care Blog</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-white transition">About Us</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Policies</h3>
            <ul className="space-y-4">
              <li><Link href="/policies/faq" className="text-gray-400 hover:text-white transition">FAQ</Link></li>
              <li><Link href="/policies/terms" className="text-gray-400 hover:text-white transition">Terms & Conditions</Link></li>
              <li><Link href="/policies/privacy" className="text-gray-400 hover:text-white transition">Privacy Policy</Link></li>
              <li><Link href="/policies/accessibility" className="text-gray-400 hover:text-white transition">Accessibility</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3 text-gray-400">
                <Mail className="h-5 w-5" />
                <span>support@petmarket.in</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400">
                <Phone className="h-5 w-5" />
                <span>+91 1800-PET-LOVE</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400">
                <MapPin className="h-5 w-5" />
                <span>Mumbai, Maharashtra, India</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} PetMarket India. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
