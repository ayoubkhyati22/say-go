export type Ride = {
  id: string;
  title: string;
  location: string;
  destination: string;
  date: string;
  time: string;
  price: number;
  driver?: {
    name: string;
    rating: number;
    carModel: string;
    plateNumber: string;
  };
};

export type Hotel = {
  id: string;
  name: string;
  location: string;
  price: number;
  rating: number;
  reviews: number;
  imageUrl: string;
  amenities: string[];
  description: string;
};

export type Flight = {
  id: string;
  title: string;
  departureAirport: string;
  arrivalAirport: string;
  departureDate: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  airline: string;
  price: number;
  stops: number;
};

export type Destination = {
  id: string;
  name: string;
  location: string;
  description: string;
  imageUrl: string;
  rating: number;
  reviews: number;
  duration: string;
  trend: string;
  popular?: boolean;
  recommended?: boolean;
  trending?: boolean;
};

export type Booking = {
  id: string;
  type: 'ride' | 'hotel' | 'flight';
  title: string;
  location?: string;
  date: string;
  time?: string;
  price: number;
  status: 'upcoming' | 'completed' | 'cancelled';
  reference: string;
};

// Mock data for popular destinations
const popularDestinations: Destination[] = [
  {
    id: 'dest-1',
    name: 'New York City',
    location: 'United States',
    description: 'The bustling city that never sleeps, offering world-class attractions, dining, and entertainment.',
    imageUrl: 'https://images.pexels.com/photos/2224861/pexels-photo-2224861.png',
    rating: 4.8,
    reviews: 4205,
    duration: '3-5 days',
    trend: 'Popular',
    popular: true,
  },
  {
    id: 'dest-2',
    name: 'Bali',
    location: 'Indonesia',
    description: 'A tropical paradise with beautiful beaches, rice terraces, and vibrant culture.',
    imageUrl: 'https://images.pexels.com/photos/2474689/pexels-photo-2474689.jpeg',
    rating: 4.9,
    reviews: 3782,
    duration: '7-10 days',
    trend: 'Trending',
    trending: true,
  },
  {
    id: 'dest-3',
    name: 'Paris',
    location: 'France',
    description: 'The romantic city of lights, famous for the Eiffel Tower, Louvre Museum, and charming cafes.',
    imageUrl: 'https://images.pexels.com/photos/532826/pexels-photo-532826.jpeg',
    rating: 4.7,
    reviews: 3589,
    duration: '4-6 days',
    trend: 'Popular',
    popular: true,
  },
];

// Mock data for all destinations
const allDestinations: Destination[] = [
  ...popularDestinations,
  {
    id: 'dest-4',
    name: 'Tokyo',
    location: 'Japan',
    description: 'A vibrant metropolis that combines ultramodern and traditional, from neon-lit skyscrapers to historic temples.',
    imageUrl: 'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg',
    rating: 4.6,
    reviews: 2951,
    duration: '7-10 days',
    trend: 'Recommended',
    recommended: true,
  },
  {
    id: 'dest-5',
    name: 'Barcelona',
    location: 'Spain',
    description: 'A city known for its art and architecture, with iconic landmarks designed by Antoni Gaudí.',
    imageUrl: 'https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg',
    rating: 4.5,
    reviews: 2732,
    duration: '4-6 days',
    trend: 'Popular',
    popular: true,
  },
  {
    id: 'dest-6',
    name: 'Maldives',
    location: 'Maldives',
    description: 'A tropical paradise with crystal clear waters, white sandy beaches, and luxurious overwater bungalows.',
    imageUrl: 'https://images.pexels.com/photos/1483053/pexels-photo-1483053.jpeg',
    rating: 4.9,
    reviews: 2356,
    duration: '5-7 days',
    trend: 'Trending',
    trending: true,
  },
  {
    id: 'dest-7',
    name: 'London',
    location: 'United Kingdom',
    description: 'A diverse and dynamic city with iconic landmarks such as Big Ben, Buckingham Palace, and the London Eye.',
    imageUrl: 'https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg',
    rating: 4.6,
    reviews: 3021,
    duration: '4-6 days',
    trend: 'Popular',
    popular: true,
  },
  {
    id: 'dest-8',
    name: 'Santorini',
    location: 'Greece',
    description: 'A stunning island known for its white-washed buildings with blue domes, breathtaking sunsets, and crystal-clear waters.',
    imageUrl: 'https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg',
    rating: 4.8,
    reviews: 2674,
    duration: '4-6 days',
    trend: 'Recommended',
    recommended: true,
  },
];

// Mock data for popular hotels
const popularHotels: Hotel[] = [
  {
    id: 'hotel-1',
    name: 'Grand Plaza Hotel',
    location: 'New York, USA',
    price: 250,
    rating: 4.7,
    reviews: 1254,
    imageUrl: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg',
    amenities: ['Free WiFi', 'Pool', 'Spa', 'Fitness Center', 'Restaurant'],
    description: 'Luxurious hotel in the heart of Manhattan, offering stunning views of the city skyline.',
  },
  {
    id: 'hotel-2',
    name: 'Seaside Resort & Spa',
    location: 'Bali, Indonesia',
    price: 180,
    rating: 4.9,
    reviews: 876,
    imageUrl: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg',
    amenities: ['Beachfront', 'Pool', 'Spa', 'Free Breakfast', 'Airport Shuttle'],
    description: 'A stunning beachfront resort offering private bungalows with direct access to crystal clear waters.',
  },
  {
    id: 'hotel-3',
    name: 'Eiffel View Apartments',
    location: 'Paris, France',
    price: 220,
    rating: 4.6,
    reviews: 932,
    imageUrl: 'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg',
    amenities: ['Free WiFi', 'Kitchen', 'Washing Machine', 'Air Conditioning', 'City View'],
    description: 'Charming apartments with stunning views of the Eiffel Tower, located in the heart of Paris.',
  },
  {
    id: 'hotel-4',
    name: 'Tokyo Skyline Hotel',
    location: 'Tokyo, Japan',
    price: 200,
    rating: 4.5,
    reviews: 756,
    imageUrl: 'https://images.pexels.com/photos/2096983/pexels-photo-2096983.jpeg',
    amenities: ['Free WiFi', 'Restaurant', 'Bar', 'Fitness Center', 'Business Center'],
    description: 'Modern hotel in central Tokyo, offering easy access to major attractions and business districts.',
  },
];

// Mock data for recent bookings
const recentBookings: Booking[] = [
  {
    id: 'booking-1',
    type: 'hotel',
    title: 'Grand Plaza Hotel',
    location: 'New York, USA',
    date: 'June 15-20, 2023',
    price: 1250,
    status: 'completed',
    reference: 'HTLBK12345',
  },
  {
    id: 'booking-2',
    type: 'flight',
    title: 'New York to London',
    date: 'July 10, 2023',
    time: '10:30 AM',
    price: 650,
    status: 'upcoming',
    reference: 'FLTBK67890',
  },
  {
    id: 'booking-3',
    type: 'ride',
    title: 'Airport to Hotel',
    location: 'JFK Airport to Manhattan',
    date: 'July 10, 2023',
    time: '2:45 PM',
    price: 75,
    status: 'upcoming',
    reference: 'RDBK54321',
  },
];

// Mock data for all bookings
const allBookings: Booking[] = [
  ...recentBookings,
  {
    id: 'booking-4',
    type: 'hotel',
    title: 'Seaside Resort & Spa',
    location: 'Bali, Indonesia',
    date: 'May 5-12, 2023',
    price: 1260,
    status: 'completed',
    reference: 'HTLBK24680',
  },
  {
    id: 'booking-5',
    type: 'flight',
    title: 'London to Paris',
    date: 'June 8, 2023',
    time: '8:15 AM',
    price: 180,
    status: 'completed',
    reference: 'FLTBK13579',
  },
  {
    id: 'booking-6',
    type: 'ride',
    title: 'City Tour',
    location: 'Paris City Center',
    date: 'June 9, 2023',
    time: '10:00 AM',
    price: 120,
    status: 'completed',
    reference: 'RDBK97531',
  },
  {
    id: 'booking-7',
    type: 'flight',
    title: 'Paris to Rome',
    date: 'August 5, 2023',
    time: '1:45 PM',
    price: 210,
    status: 'cancelled',
    reference: 'FLTBK24680',
  },
];

// Helper functions to get data
export function getPopularDestinations(): Destination[] {
  return popularDestinations;
}

export function getDestinations(category: string = 'all'): Destination[] {
  if (category === 'all') {
    return allDestinations;
  } else if (category === 'popular') {
    return allDestinations.filter(dest => dest.popular);
  } else if (category === 'recommended') {
    return allDestinations.filter(dest => dest.recommended);
  } else if (category === 'trending') {
    return allDestinations.filter(dest => dest.trending);
  }
  return allDestinations;
}

export function getDestinationById(id: string): Destination | undefined {
  return allDestinations.find(dest => dest.id === id);
}

export function getPopularHotels(): Hotel[] {
  return popularHotels;
}

export function getHotelById(id: string): Hotel | undefined {
  return popularHotels.find(hotel => hotel.id === id);
}

export function getRecentBookings(): Booking[] {
  return recentBookings;
}

export function getAllBookings(): Booking[] {
  return allBookings;
}

export function getBookingById(id: string): Booking | undefined {
  return allBookings.find(booking => booking.id === id);
}