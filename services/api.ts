import axios from 'axios';
import { Journey } from '@/types';

const API_URL = 'http://localhost:5678/webhook/843cdf57-fbf1-40ad-bb6f-05e5ed40eb34';

export async function searchTravelOptions(message: string): Promise<Journey[]> {
  try {
    const response = await axios.post(API_URL, { message });
    
    if (!response.data) {
      throw new Error('No data received from API');
    }
    
    return response.data;
  } catch (error) {
    console.error('Error searching travel options:', error);
    throw error;
  }
}