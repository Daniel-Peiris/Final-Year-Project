import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { crops } from '../data/crops';
import { ArrowLeft, Droplet, Thermometer, Clock, Leaf } from 'lucide-react';

export const CropDetail = () => {
  const { id } = useParams();
  const crop = crops.find(c => c.id === id);

  if (!crop) {
    return <div>Crop not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link 
          to="/" 
          className="inline-flex items-center text-green-600 hover:text-green-700 mb-8"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Home
        </Link>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="relative h-96">
            <img
              src={crop.imageUrl}
              alt={crop.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 p-8 text-white">
              <h1 className="text-4xl font-bold mb-2">{crop.name}</h1>
              <p className="text-2xl">{crop.sinhalaName}</p>
            </div>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-semibold mb-4">Overview</h2>
                <p className="text-gray-600 mb-6">{crop.description}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-green-600 mr-2" />
                    <span>{crop.growthPeriod} days growth</span>
                  </div>
                  <div className="flex items-center">
                    <Droplet className="h-5 w-5 text-green-600 mr-2" />
                    <span>{crop.waterRequirements}</span>
                  </div>
                  <div className="flex items-center">
                    <Thermometer className="h-5 w-5 text-green-600 mr-2" />
                    <span>{crop.idealTemperature}</span>
                  </div>
                  <div className="flex items-center">
                    <Leaf className="h-5 w-5 text-green-600 mr-2" />
                    <span>{crop.soilTypes.join(', ')}</span>
                  </div>
                </div>

                <h3 className="text-xl font-semibold mb-3">Seasonal Information</h3>
                <p className="text-gray-600 mb-6">{crop.seasonalInfo}</p>

                <h3 className="text-xl font-semibold mb-3">Cultivation Guide</h3>
                <p className="text-gray-600">{crop.cultivation}</p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-4">Common Diseases</h2>
                <div className="space-y-4">
                  {crop.diseases.map((disease, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-lg mb-2">{disease.name}</h4>
                      <p className="text-gray-600 mb-2">
                        <span className="font-medium">Symptoms:</span> {disease.symptoms}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium">Treatment:</span> {disease.treatment}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};