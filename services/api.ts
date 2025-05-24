import axios from 'axios';
import { Journey } from '@/types';

const API_URL = 'http://localhost:5678/webhook-test/843cdf57-fbf1-40ad-bb6f-05e5ed40eb34';

// Add debounce utility
function debounce<T extends (...args: any[]) => Promise<any>>(
  func: T,
  wait: number
): (...args: Parameters<T>) => Promise<ReturnType<T>> {
  let timeout: NodeJS.Timeout;
  let previousPromise: Promise<any> | null = null;

  return (...args: Parameters<T>): Promise<ReturnType<T>> => {
    if (previousPromise) {
      return previousPromise;
    }

    return new Promise((resolve, reject) => {
      if (timeout) {
        clearTimeout(timeout);
      }

      timeout = setTimeout(async () => {
        try {
          previousPromise = func(...args);
          const result = await previousPromise;
          previousPromise = null;
          resolve(result);
        } catch (error) {
          previousPromise = null;
          reject(error);
        }
      }, wait);
    });
  };
}

// Debounced search function
export const searchTravelOptions = debounce(async (message: string): Promise<Journey[]> => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });
    
    if (!response.ok) {
      throw new Error('API request failed');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error searching travel options:', error);
    return getMockJourneys();
  }
}, 300); // 300ms debounce delay

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