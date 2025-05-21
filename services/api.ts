import axios from 'axios';
import { Journey } from '@/types';

const API_URL = 'http://localhost:5678/webhook-test/843cdf57-fbf1-40ad-bb6f-05e5ed40eb34';

export async function searchTravelOptions(query: string): Promise<Journey[]> {
  try {
    const response = await axios.post(API_URL, {
      message: query
    }, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    if (!response.data) {
      return getMockJourneys();
    }
    
    // Transform the API response to match our Journey type
    return response.data.map((item: any) => ({
      index: item.index,
      journey: {
        id: item.journey.trainNumber,
        campany: item.journey.campany,
        departureTime: item.journey.departureTime,
        departureStation: item.journey.departureStation,
        arrivalTime: item.journey.arrivalTime,
        arrivalStation: item.journey.arrivalStation,
        trainNumber: item.journey.trainNumber,
        duration: item.journey.duration,
        price: item.journey.price,
        currency: item.journey.currency
      }
    }));
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
        price: 190,
        currency: "DH"
      }
    }
  ];
}