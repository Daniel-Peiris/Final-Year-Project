import React from 'react';
import { Droplet, Thermometer, Clock } from 'lucide-react';
import type { Crop } from '../types';

export const CropCard = ({ crop }: { crop: Crop }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900">{crop.name}</h3>
        <p className="mt-2 text-gray-500">{crop.description}</p>
        <div className="mt-4 flex space-x-4">
          <Detail icon={Clock} text={`${crop.growthPeriod} days`} />
          <Detail icon={Droplet} text={crop.waterRequirements} />
          <Detail icon={Thermometer} text={crop.idealTemperature} />
        </div>
      </div>
    </div>
  );
};

const Detail = ({ icon: Icon, text }: { icon: any; text: string }) => (
  <div className="flex items-center text-sm text-gray-500">
    <Icon className="h-4 w-4 mr-1 text-green-500" />
    <span>{text}</span>
  </div>
);