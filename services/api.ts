import axios from 'axios';
import { Journey } from '../types';

const API_URL = 'http://localhost:5678/webhook/843cdf57-fbf1-40ad-bb6f-05e5ed40eb34';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function searchTravelOptions(message: string): Promise<Journey[]> {
  try {
    const response = await api.post('', { message });
    
    if (!response.data) {
      throw new Error('No data received from API');
    }
    
    return response.data;
  } catch (error) {
    console.error('Error searching travel options:', error);
    // Return mock data in case of error
    return getMockJourneys();
  }
}

function getMockJourneys(): Journey[] {
  return [
    {
      campany: "oncf",
      index: 1,
      journey: {
        departureTime: "08:30",
        departureStation: {
          code: "200",
          name: "casa voyageurs"
        },
        arrivalTime: "14:37",
        arrivalStation: {
          code: "303",
          name: "tanger ville"
        },
        trainNumber: "V60008",
        duration: "2h 20 min",
        price: 210,
        currency: "DH"
      }
    }
  ];
}