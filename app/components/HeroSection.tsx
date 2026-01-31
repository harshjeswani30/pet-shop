'use client';

import Link from 'next/link';
import { ArrowRight, Play } from 'lucide-react';
import { branding } from '@/lib/config/branding';

export default function HeroSection() {
  return (
    <div className="relative bg-gradient-to-br from-primary-50 via-white to-accent-50 overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative z-10">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-medium mb-6">
              <span className="flex h-2 w-2 rounded-full bg-primary-500 mr-2"></span>
              {branding.stats.verifiedSellers}+ Verified Sellers
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
              Find Your Perfect{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-accent-500">
                Pet Companion
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-xl">
              {branding.company.description}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link href="/shop" className="inline-flex justify-center items-center px-8 py-4 border border-transparent text-base font-medium rounded-xl text-white bg-primary-600 hover:bg-primary-700 shadow-lg shadow-primary-600/30 transition-all hover:scale-105">
                Explore Pets
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link href="/about" className="inline-flex justify-center items-center px-8 py-4 border-2 border-gray-300 text-base font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-50 transition-all">
                <Play className="mr-2 h-5 w-5 text-primary-600" />
                Learn More
              </Link>
            </div>
            
            <div className="flex items-center space-x-8 text-sm text-gray-500">
              <div className="flex items-center">
                <svg className="h-5 w-5 text-accent-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Vet Checked
              </div>
              <div className="flex items-center">
                <svg className="h-5 w-5 text-accent-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Health Certified
              </div>
              <div className="flex items-center">
                <svg className="h-5 w-5 text-accent-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Secure Payment
              </div>
            </div>
          </div>
          
          <div className="relative hidden lg:block">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?q=80&w=1000&auto=format&fit=crop" 
                alt="Happy dog with owner" 
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
            
            {/* Floating Stats Card */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-6">
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 bg-accent-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🏆</span>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Customer Rating</p>
                  <p className="text-2xl font-bold text-gray-900">{branding.stats.satisfactionRate}</p>
                </div>
              </div>
            </div>
            
            {/* Floating Badge */}
            <div className="absolute -top-4 -right-4 bg-primary-600 text-white rounded-2xl shadow-xl p-4">
              <p className="text-sm font-medium">Trusted by</p>
              <p className="text-2xl font-bold">{branding.stats.happyHomes}</p>
              <p className="text-sm opacity-80">Happy Families</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
