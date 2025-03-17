import { Crop } from '../types';

export const crops: Crop[] = [
  {
    id: 'tomatoes',
    name: 'Tomatoes',
    sinhalaName: 'තක්කලි',
    category: 'Vegetables',
    growthPeriod: 90,
    soilTypes: ['loamy', 'well-draining'],
    waterRequirements: 'Moderate',
    idealTemperature: '20-27°C',
    description: 'A versatile fruit commonly used as a vegetable, rich in vitamins and antioxidants.',
    imageUrl: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=2400&q=80',
    seasonalInfo: 'Best planted during dry season',
    diseases: [
      {
        name: 'Early Blight',
        symptoms: 'Dark brown spots with concentric rings on leaves',
        treatment: 'Remove infected leaves, apply fungicide'
      },
      {
        name: 'Bacterial Wilt',
        symptoms: 'Wilting of plants, browning of vascular tissue',
        treatment: 'Crop rotation, use resistant varieties'
      }
    ],
    cultivation: 'Start seeds in nursery, transplant after 3-4 weeks. Space plants 45-60cm apart.'
  },
  {
    id: 'chili',
    name: 'Chili',
    sinhalaName: 'මිරිස්',
    category: 'Spices',
    growthPeriod: 120,
    soilTypes: ['sandy loam', 'clay loam'],
    waterRequirements: 'Moderate',
    idealTemperature: '20-30°C',
    description: 'Essential spice crop known for its heat and flavor.',
    imageUrl: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=2400&q=80',
    seasonalInfo: 'Can be grown year-round with proper care',
    diseases: [
      {
        name: 'Anthracnose',
        symptoms: 'Dark, sunken lesions on fruits',
        treatment: 'Use disease-free seeds, apply fungicides'
      }
    ],
    cultivation: 'Requires well-drained soil and full sunlight. Start seeds in nursery.'
  },
  {
    id: 'cabbage',
    name: 'Cabbage',
    sinhalaName: 'ගෝවා',
    category: 'Vegetables',
    growthPeriod: 90,
    soilTypes: ['fertile loam', 'clay loam'],
    waterRequirements: 'High',
    idealTemperature: '15-20°C',
    description: 'A leafy vegetable known for its dense-leaved head.',
    imageUrl: 'https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?auto=format&fit=crop&w=2400&q=80',
    seasonalInfo: 'Best grown in cool season',
    diseases: [
      {
        name: 'Black Rot',
        symptoms: 'Yellow V-shaped lesions on leaf edges',
        treatment: 'Use disease-free seeds, practice crop rotation'
      }
    ],
    cultivation: 'Requires rich, well-drained soil. Space plants 45cm apart.'
  },
  {
    id: 'bitter-gourd',
    name: 'Bitter Gourd',
    sinhalaName: 'කරවිල',
    category: 'Vegetables',
    growthPeriod: 75,
    soilTypes: ['sandy loam', 'well-draining'],
    waterRequirements: 'Moderate',
    idealTemperature: '25-30°C',
    description: 'A tropical vine with bitter fruits known for medicinal properties.',
    imageUrl: 'https://images.unsplash.com/photo-1593204414113-a4fc67a4a4e9?auto=format&fit=crop&w=2400&q=80',
    seasonalInfo: 'Grows best in warm season',
    diseases: [
      {
        name: 'Powdery Mildew',
        symptoms: 'White powdery coating on leaves',
        treatment: 'Apply sulfur-based fungicides'
      }
    ],
    cultivation: 'Needs trellising support. Plant seeds directly.'
  },
  {
    id: 'long-beans',
    name: 'Long Beans',
    sinhalaName: 'මා කරල්',
    category: 'Vegetables',
    growthPeriod: 60,
    soilTypes: ['sandy loam', 'clay loam'],
    waterRequirements: 'Moderate',
    idealTemperature: '20-30°C',
    description: 'Long, slender pods with excellent nutritional value.',
    imageUrl: 'https://images.unsplash.com/photo-1627735483792-c3cd607bd09d?auto=format&fit=crop&w=2400&q=80',
    seasonalInfo: 'Can be grown year-round',
    diseases: [
      {
        name: 'Bean Rust',
        symptoms: 'Rusty spots on leaves',
        treatment: 'Improve air circulation, apply fungicides'
      }
    ],
    cultivation: 'Requires support structure. Plant seeds 10cm apart.'
  },
  {
    id: 'pumpkin',
    name: 'Pumpkin',
    sinhalaName: 'වට්ටක්කා',
    category: 'Vegetables',
    growthPeriod: 100,
    soilTypes: ['rich loam', 'well-draining'],
    waterRequirements: 'Moderate to High',
    idealTemperature: '20-25°C',
    description: 'Large, sprawling vine producing nutritious fruits.',
    imageUrl: 'https://images.unsplash.com/photo-1569976710208-b52636b52c09?auto=format&fit=crop&w=2400&q=80',
    seasonalInfo: 'Plant in warm season',
    diseases: [
      {
        name: 'Powdery Mildew',
        symptoms: 'White powder on leaves',
        treatment: 'Improve air circulation, apply fungicides'
      }
    ],
    cultivation: 'Needs lots of space. Plant on mounds.'
  },
  {
    id: 'eggplant',
    name: 'Eggplant',
    sinhalaName: 'වම්බටු',
    category: 'Vegetables',
    growthPeriod: 70,
    soilTypes: ['sandy loam', 'rich loam'],
    waterRequirements: 'Moderate',
    idealTemperature: '21-30°C',
    description: 'Purple fruits rich in nutrients and antioxidants.',
    imageUrl: 'https://images.unsplash.com/photo-1528826007177-f38517ce0875?auto=format&fit=crop&w=2400&q=80',
    seasonalInfo: 'Best grown in warm season',
    diseases: [
      {
        name: 'Verticillium Wilt',
        symptoms: 'Yellowing and wilting of leaves',
        treatment: 'Crop rotation, resistant varieties'
      }
    ],
    cultivation: 'Start seeds in nursery. Space plants 60cm apart.'
  },
  {
    id: 'cucumber',
    name: 'Cucumber',
    sinhalaName: 'පිපිඤ්ඤා',
    category: 'Vegetables',
    growthPeriod: 55,
    soilTypes: ['sandy loam', 'well-draining'],
    waterRequirements: 'High',
    idealTemperature: '20-30°C',
    description: 'Refreshing vegetable perfect for salads.',
    imageUrl: 'https://images.unsplash.com/photo-1604977042946-1eecc30f269e?auto=format&fit=crop&w=2400&q=80',
    seasonalInfo: 'Grows best in warm weather',
    diseases: [
      {
        name: 'Downy Mildew',
        symptoms: 'Yellow spots on leaves',
        treatment: 'Improve air circulation, apply fungicides'
      }
    ],
    cultivation: 'Provide support for climbing. Regular watering essential.'
  },
  {
    id: 'green-leaves',
    name: 'Green Leaves',
    sinhalaName: 'ගොටුකොළ, මුකුණුවැන්න, තම්පලා',
    category: 'Leafy Vegetables',
    growthPeriod: 30,
    soilTypes: ['rich loam', 'well-draining'],
    waterRequirements: 'Moderate',
    idealTemperature: '20-30°C',
    description: 'Various nutritious leafy greens essential in local cuisine.',
    imageUrl: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=2400&q=80',
    seasonalInfo: 'Can be grown year-round',
    diseases: [
      {
        name: 'Leaf Spot',
        symptoms: 'Brown spots on leaves',
        treatment: 'Avoid overhead watering, remove infected leaves'
      }
    ],
    cultivation: 'Regular harvesting promotes new growth.'
  },
  {
    id: 'drumstick',
    name: 'Drumstick',
    sinhalaName: 'මුරුංගා',
    category: 'Vegetables',
    growthPeriod: 180,
    soilTypes: ['well-draining', 'sandy loam'],
    waterRequirements: 'Low to Moderate',
    idealTemperature: '25-35°C',
    description: 'Nutrient-rich tree with edible pods, leaves, and flowers.',
    imageUrl: 'https://images.unsplash.com/photo-1593204414113-a4fc67a4a4e9?auto=format&fit=crop&w=2400&q=80',
    seasonalInfo: 'Perennial tree that produces year-round',
    diseases: [
      {
        name: 'Root Rot',
        symptoms: 'Yellowing leaves, stunted growth',
        treatment: 'Improve drainage, avoid overwatering'
      }
    ],
    cultivation: 'Plant in permanent location. Needs full sun.'
  }
];