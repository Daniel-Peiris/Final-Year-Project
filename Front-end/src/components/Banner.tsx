import React from 'react';
import { Plane as Plant } from 'lucide-react';

export const Banner = () => {
  return (
    <div className="relative bg-gradient-to-r from-green-600 to-green-800 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=2850&q=80"
          alt="Farm field"
          className="w-full h-full object-cover opacity-20"
        />
      </div>
      <div className="relative max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <Plant className="h-16 w-16 mx-auto text-green-300 animate-bounce" />
          <h1 className="mt-4 text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
            Harvest Wise
          </h1>
          <p className="max-w-xl mt-5 mx-auto text-xl text-green-100">
            Empowering farmers with data-driven insights for smarter agricultural decisions
          </p>
        </div>
      </div>
    </div>
  );
};