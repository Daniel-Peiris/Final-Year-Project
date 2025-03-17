import React, { useState } from 'react';
import { crops } from '../data/crops';
import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const KnowledgeBase = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCrops = crops.filter(crop => 
    crop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    crop.sinhalaName.includes(searchQuery) ||
    crop.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Crop Knowledge Base</h1>
          <p className="text-lg text-gray-600">Discover detailed information about various crops and their cultivation</p>
        </div>

        <div className="max-w-3xl mx-auto mb-12">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search crops by name or description..."
              className="w-full py-3 px-12 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCrops.map((crop) => (
            <Link
              to={`/crops/${crop.id}`}
              key={crop.id}
              className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="aspect-w-16 aspect-h-9 overflow-hidden">
                <img
                  src={crop.imageUrl}
                  alt={crop.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-semibold text-gray-900">{crop.name}</h3>
                  <p className="text-lg text-gray-600">{crop.sinhalaName}</p>
                </div>
                <p className="text-gray-600 mb-4 line-clamp-2">{crop.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                    {crop.category}
                  </span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {crop.growthPeriod} days
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-green-600">{crop.waterRequirements} water needs</span>
                  <ArrowRight className="h-5 w-5 text-green-600 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};