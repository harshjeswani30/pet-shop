'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

const FILTER_OPTIONS = {
  age: ['Puppy', 'Kitten', 'Adult', 'Handfeed Chicks'],
  gender: ['Male', 'Female', 'Pair'],
  adoptiveType: ['Tamed', 'Wild'],
  certificate: ['With KCI', 'With INKC', 'Without KCI/INKC'],
  coatTypes: ['Short', 'Long', 'Double Coat', 'Curly', 'Smooth', 'WireHaired', 'Wooly'],
  colors: ['White', 'Black', 'Golden', 'Brown', 'Grey', 'Black & Tan', 'Pure Black'],
};

export default function FilterSidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [filters, setFilters] = useState({
    age: searchParams.get('age') || '',
    gender: searchParams.get('gender') || '',
    coatType: searchParams.get('coatType') || '',
    color: searchParams.get('color') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
  });

  const handleFilterChange = (name: string, value: string) => {
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(name, value);
    } else {
      params.delete(name);
    }
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="space-y-8 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
      <div>
        <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 mb-4">Price Range</h3>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <span className="absolute left-3 top-2 text-gray-400">₹</span>
            <input
              type="number"
              placeholder="Min"
              value={filters.minPrice}
              onChange={(e) => handleFilterChange('minPrice', e.target.value)}
              className="w-full pl-7 pr-3 py-2 border rounded-md text-sm outline-none focus:ring-1 focus:ring-primary-500"
            />
          </div>
          <span className="text-gray-400">-</span>
          <div className="relative">
            <span className="absolute left-3 top-2 text-gray-400">₹</span>
            <input
              type="number"
              placeholder="Max"
              value={filters.maxPrice}
              onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
              className="w-full pl-7 pr-3 py-2 border rounded-md text-sm outline-none focus:ring-1 focus:ring-primary-500"
            />
          </div>
        </div>
      </div>

      {[
        { name: 'age', label: 'Age', options: FILTER_OPTIONS.age },
        { name: 'gender', label: 'Gender', options: FILTER_OPTIONS.gender },
        { name: 'coatType', label: 'Coat Type', options: FILTER_OPTIONS.coatTypes },
        { name: 'color', label: 'Color', options: FILTER_OPTIONS.colors },
        { name: 'adoptiveType', label: 'Adoptive Type', options: FILTER_OPTIONS.adoptiveType },
        { name: 'certificate', label: 'Certificate', options: FILTER_OPTIONS.certificate },
      ].map((section) => (
        <div key={section.name}>
          <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 mb-4">{section.label}</h3>
          <div className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
            {section.options.map((option) => (
              <label key={option} className="flex items-center space-x-3 cursor-pointer group">
                <input
                  type="radio"
                  name={section.name}
                  checked={filters[section.name as keyof typeof filters] === option}
                  onChange={() => handleFilterChange(section.name, option)}
                  className="h-4 w-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                />
                <span className="text-sm text-gray-600 group-hover:text-primary-600 transition">{option}</span>
              </label>
            ))}
          </div>
          <button 
            onClick={() => handleFilterChange(section.name, '')}
            className="text-[10px] font-bold text-primary-600 hover:underline mt-2 uppercase"
          >
            Clear {section.label}
          </button>
        </div>
      ))}
    </div>
  );
}
