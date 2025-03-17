import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Crop } from '../types';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface CropCarouselProps {
  crops: Crop[];
}

export const CropCarousel = ({ crops }: CropCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  
  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex + 1 >= crops.length ? 0 : prevIndex + 1
        );
      }, 3000);
      
      return () => clearInterval(interval);
    }
  }, [crops.length, isHovered]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex + 1 >= crops.length ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex - 1 < 0 ? crops.length - 1 : prevIndex - 1
    );
  };

  const getVisibleCrops = () => {
    const isMobile = window.innerWidth < 768;
    const itemsToShow = isMobile ? 1 : 3;
    const items = [];
    
    for (let i = 0; i < itemsToShow; i++) {
      const index = (currentIndex + i) % crops.length;
      items.push(crops[index]);
    }
    
    return items;
  };

  return (
    <div 
      className="relative" 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="overflow-hidden py-8">
        <div className="flex transition-transform duration-500 gap-6">
          {getVisibleCrops().map((crop) => (
            <Link 
              to={`/crops/${crop.id}`} 
              key={crop.id}
              className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 flex-shrink-0 w-full md:w-[calc(33.333%-1rem)]"
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
                <div className="flex justify-between items-center">
                  <span className="text-sm text-green-600">Growth period: {crop.growthPeriod} days</span>
                  <ArrowRight className="h-5 w-5 text-green-600 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      
      <button 
        onClick={prevSlide}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors"
      >
        <ChevronLeft className="h-6 w-6 text-gray-600" />
      </button>
      
      <button 
        onClick={nextSlide}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors"
      >
        <ChevronRight className="h-6 w-6 text-gray-600" />
      </button>
    </div>
  );
};