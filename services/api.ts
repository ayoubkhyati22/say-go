import axios from 'axios';
import { Journey } from '@/types';

const API_URL = 'http://localhost:5678/webhook-test/843cdf57-fbf1-40ad-bb6f-05e5ed40eb34';

export async function searchTravelOptions(message: string): Promise<Journey[]> {
  try {
    const response = await fetch(
      API_URL,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      }
    );
    
    if (!response.ok) {
      return getMockJourneys();
    }
    
    return response.json();
  } catch (error) {
    console.error('Error searching travel options:', error);
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
        duration: "6h 7 min",
        price: 210,
        currency: "DH"
      }
    }
  ];
}