import React from 'react';
import { crops } from '../data/crops';
import { CropCarousel } from './CropCarousel';

export const CropList = () => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Knowledge Base</h2>
      <CropCarousel crops={crops} />
    </div>
  );
};