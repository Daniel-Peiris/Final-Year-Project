import React, { useState } from 'react';
import { Search } from 'lucide-react';

export const SearchBar = () => {
  const [query, setQuery] = useState('');

  return (
    <div className="max-w-3xl mx-auto px-4">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full py-3 px-12 border border-gray-200 rounded-full focus:outline-none focus:border-green-500"
          placeholder="Search for crops, guides, or market insights..."
        />
        <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
      </div>
    </div>
  );
};