import Link from 'next/link';
import { PawPrint, Facebook, Twitter, Instagram, Youtube, Linkedin, Mail, Phone, MapPin, Award, ShieldCheck, Heart } from 'lucide-react';
import { branding } from '@/lib/config/branding';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      {/* Trust Badges */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {branding.certifications.map((cert) => (
              <div key={cert.name} className="flex items-center justify-center space-x-3">
                <Award className="h-8 w-8 text-accent-400" />
                <div className="text-left">
                  <p className="font-semibold text-sm">{cert.name}</p>
                  <p className="text-xs text-gray-400">Certified</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <PawPrint className="h-8 w-8 text-primary-400" />
              <span className="text-xl font-bold">{branding.company.name}</span>
            </div>
            <p className="text-gray-400 mb-6">
              {branding.company.mission}
            </p>
            <div className="flex space-x-4">
              <a href={branding.social.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition"><Facebook className="h-5 w-5" /></a>
              <a href={branding.social.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition"><Twitter className="h-5 w-5" /></a>
              <a href={branding.social.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition"><Instagram className="h-5 w-5" /></a>
              <a href={branding.social.youtube} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition"><Youtube className="h-5 w-5" /></a>
              <a href={branding.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition"><Linkedin className="h-5 w-5" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Shop</h3>
            <ul className="space-y-3">
              <li><Link href="/shop" className="text-gray-400 hover:text-white transition">All Pets</Link></li>
              <li><Link href="/shop/new-arrivals" className="text-gray-400 hover:text-white transition">New Arrivals</Link></li>
              <li><Link href="/shop/high-sold" className="text-gray-400 hover:text-white transition">Popular Pets</Link></li>
              <li><Link href="/shop/on-sale" className="text-gray-400 hover:text-white transition">On Sale</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Company</h3>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-gray-400 hover:text-white transition">About Us</Link></li>
              <li><Link href="/blog" className="text-gray-400 hover:text-white transition">Blog</Link></li>
              <li><Link href="/auth/register?seller=true" className="text-gray-400 hover:text-white transition">Become a Seller</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white transition">Contact</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3 text-gray-400">
                <Mail className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <span className="text-sm">{branding.contact.email}</span>
              </li>
              <li className="flex items-start space-x-3 text-gray-400">
                <Phone className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <span className="text-sm">{branding.contact.phone}</span>
              </li>
              <li className="flex items-start space-x-3 text-gray-400">
                <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <span className="text-sm">{branding.contact.address.city}, {branding.contact.address.country}</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {currentYear} {branding.company.name}. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            <Link href="/policies/privacy" className="text-gray-400 hover:text-white transition">Privacy</Link>
            <Link href="/policies/terms" className="text-gray-400 hover:text-white transition">Terms</Link>
            <Link href="/policies/faq" className="text-gray-400 hover:text-white transition">FAQ</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
