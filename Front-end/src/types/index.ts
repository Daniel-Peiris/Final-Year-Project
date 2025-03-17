export interface Crop {
  id: string;
  name: string;
  sinhalaName: string;
  category: string;
  growthPeriod: number;
  soilTypes: string[];
  waterRequirements: string;
  idealTemperature: string;
  description: string;
  imageUrl: string;
  seasonalInfo: string;
  diseases: Disease[];
  cultivation: string;
}

export interface Disease {
  name: string;
  symptoms: string;
  treatment: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface PriceData {
  date: string;
  price: number;
}

export interface HarvestCalculation {
  cropId: string;
  area: number;
  soilType: string;
  expectedYield: number;
  profitability: number;
}