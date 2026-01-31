'use client';

import { Star } from 'lucide-react';

interface TestimonialCardProps {
  content: string;
  author: string;
  role: string;
  location?: string;
  rating: number;
  image?: string;
  type?: 'buyer' | 'seller' | 'adoption';
  metrics?: {
    listings?: number;
    sales?: number;
    homes?: number;
  };
}

export default function TestimonialCard({
  content,
  author,
  role,
  location,
  rating,
  image,
  type = 'buyer',
  metrics,
}: TestimonialCardProps) {
  const typeColors = {
    buyer: 'bg-blue-50 border-blue-100',
    seller: 'bg-green-50 border-green-100',
    adoption: 'bg-purple-50 border-purple-100',
  };

  const typeBadgeColors = {
    buyer: 'bg-blue-100 text-blue-700',
    seller: 'bg-green-100 text-green-700',
    adoption: 'bg-purple-100 text-purple-700',
  };

  const typeLabels = {
    buyer: 'Pet Parent',
    seller: 'Verified Seller',
    adoption: 'Adoption Story',
  };

  return (
    <div className={`p-6 rounded-2xl border ${typeColors[type]} hover:shadow-lg transition`}>
      <div className="flex items-center justify-between mb-4">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${typeBadgeColors[type]}`}>
          {typeLabels[type]}
        </span>
        <div className="flex text-yellow-400">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${i < rating ? 'fill-current' : 'text-gray-300'}`}
            />
          ))}
        </div>
      </div>

      <p className="text-gray-700 italic mb-6">&ldquo;{content}&rdquo;</p>

      {metrics && (
        <div className="flex gap-4 mb-4 p-3 bg-white/50 rounded-lg">
          {metrics.listings !== undefined && (
            <div className="text-center">
              <div className="text-lg font-bold text-gray-900">{metrics.listings}</div>
              <div className="text-xs text-gray-500">Listings</div>
            </div>
          )}
          {metrics.sales !== undefined && (
            <div className="text-center">
              <div className="text-lg font-bold text-gray-900">{metrics.sales}</div>
              <div className="text-xs text-gray-500">Sales</div>
            </div>
          )}
          {metrics.homes !== undefined && (
            <div className="text-center">
              <div className="text-lg font-bold text-gray-900">{metrics.homes}</div>
              <div className="text-xs text-gray-500">Happy Homes</div>
            </div>
          )}
        </div>
      )}

      <div className="flex items-center">
        {image ? (
          <img src={image} alt={author} className="h-12 w-12 rounded-full object-cover mr-4" />
        ) : (
          <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center mr-4">
            <span className="text-gray-500 font-medium">{author[0]}</span>
          </div>
        )}
        <div>
          <p className="font-bold text-gray-900">{author}</p>
          <p className="text-sm text-gray-500">
            {role} {location && `• ${location}`}
          </p>
        </div>
      </div>
    </div>
  );
}
