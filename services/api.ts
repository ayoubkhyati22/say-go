import axios from 'axios';
import { Journey } from '@/types';

const API_URL = 'http://localhost:5678/webhook-test/843cdf57-fbf1-40ad-bb6f-05e5ed40eb34';

/**
 * Search for travel options
 * @param query The search query string
 * @returns Promise with search results
 */
export async function searchTravelOptions(query: string): Promise<Journey[]> {
  try {
    const response = await axios.post(API_URL, {
      message: query
    }, {
      headers: {
        'Content-Type': 'application/json',
        // Autres en-têtes si nécessaire
      }
    }); // La parenthèse fermante était mal placée ici
    
    // For development purposes, if the API is not available, return mock data
    if (!response.data) {
      return getMockJourneys();
    }
    
    return response.data;
  } catch (error) {
    console.error('Error searching travel options:', error);
    
    // In a real application, we'd want to throw the error
    // For demo purposes, we'll return mock data
    return getMockJourneys();
  }
}

/**
 * Get mock journey data for development/testing
 */
function getMockJourneys(): Journey[] {
  return [
    {
      index: 1,
      journey: {
        departureTime: "--:--",
        departureStation: {
          code: "---",
          name: "---"
        },
        arrivalTime: "--:--",
        arrivalStation: {
          code: "---",
          name: "---"
        },
        trainNumber: "---",
        duration: "-- - ---",
        price: 0,
        currency: "--"
      }
    }
  ];
}