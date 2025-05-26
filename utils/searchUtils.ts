import { Hotel, Ride, Flight } from '../data/travelData';

// Mock database of rides
const ridesDatabase: Ride[] = [
  {
    id: 'ride-1',
    title: 'Manhattan to JFK Airport',
    location: 'Manhattan, NY',
    destination: 'JFK Airport, NY',
    date: 'Today',
    time: '14:30',
    price: 65,
    driver: {
      name: 'Michael Johnson',
      rating: 4.8,
      carModel: 'Toyota Camry',
      plateNumber: 'NY123456',
    },
  },
  {
    id: 'ride-2',
    title: 'Brooklyn to Manhattan',
    location: 'Brooklyn, NY',
    destination: 'Times Square, Manhattan',
    date: 'Today',
    time: '15:45',
    price: 35,
    driver: {
      name: 'Sarah Williams',
      rating: 4.9,
      carModel: 'Honda Accord',
      plateNumber: 'NY789012',
    },
  },
  {
    id: 'ride-3',
    title: 'Central Park to Empire State Building',
    location: 'Central Park, NY',
    destination: 'Empire State Building, NY',
    date: 'Today',
    time: '17:00',
    price: 25,
    driver: {
      name: 'David Brown',
      rating: 4.7,
      carModel: 'Tesla Model 3',
      plateNumber: 'NY345678',
    },
  },
  {
    id: 'ride-4',
    title: 'LaGuardia Airport to Times Square',
    location: 'LaGuardia Airport, NY',
    destination: 'Times Square, NY',
    date: 'Today',
    time: '18:30',
    price: 55,
    driver: {
      name: 'Jennifer Lee',
      rating: 4.6,
      carModel: 'Chevrolet Malibu',
      plateNumber: 'NY901234',
    },
  },
  {
    id: 'ride-5',
    title: 'Staten Island Ferry to Wall Street',
    location: 'Staten Island Ferry Terminal',
    destination: 'Wall Street, NY',
    date: 'Tomorrow',
    time: '08:45',
    price: 40,
    driver: {
      name: 'Robert Wilson',
      rating: 4.8,
      carModel: 'Ford Fusion',
      plateNumber: 'NY567890',
    },
  },
];

// Mock database of hotels
const hotelsDatabase: Hotel[] = [
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
  {
    id: 'hotel-5',
    name: 'Manhattan Luxury Suites',
    location: 'New York, USA',
    price: 300,
    rating: 4.8,
    reviews: 987,
    imageUrl: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg',
    amenities: ['Free WiFi', 'Spa', 'Fitness Center', 'Restaurant', 'Concierge'],
    description: 'Elegant suites in the heart of Manhattan, offering luxury accommodations for discerning travelers.',
  },
  {
    id: 'hotel-6',
    name: 'Historic Downtown Inn',
    location: 'Boston, USA',
    price: 180,
    rating: 4.6,
    reviews: 654,
    imageUrl: 'https://images.pexels.com/photos/237371/pexels-photo-237371.jpeg',
    amenities: ['Free WiFi', 'Breakfast', 'Historic Building', 'Central Location'],
    description: 'Charming inn located in a historic building in downtown Boston, close to major attractions.',
  },
  {
    id: 'hotel-7',
    name: 'Marina Bay View',
    location: 'Singapore',
    price: 280,
    rating: 4.9,
    reviews: 1120,
    imageUrl: 'https://images.pexels.com/photos/2869215/pexels-photo-2869215.jpeg',
    amenities: ['Infinity Pool', 'Spa', 'Multiple Restaurants', 'City View', 'Luxury Rooms'],
    description: 'Luxury hotel with stunning views of Marina Bay and Singapore skyline, featuring world-class amenities.',
  },
];

// Mock database of flights
const flightsDatabase: Flight[] = [
  {
    id: 'flight-1',
    title: 'New York to London',
    departureAirport: 'JFK',
    arrivalAirport: 'LHR',
    departureDate: '2023-07-15',
    departureTime: '21:45',
    arrivalTime: '10:30',
    duration: '7h 45m',
    airline: 'British Airways',
    price: 650,
    stops: 0,
  },
  {
    id: 'flight-2',
    title: 'New York to San Francisco',
    departureAirport: 'JFK',
    arrivalAirport: 'SFO',
    departureDate: '2023-07-20',
    departureTime: '08:30',
    arrivalTime: '12:15',
    duration: '6h 45m',
    airline: 'Delta Airlines',
    price: 350,
    stops: 0,
  },
  {
    id: 'flight-3',
    title: 'New York to Tokyo',
    departureAirport: 'JFK',
    arrivalAirport: 'HND',
    departureDate: '2023-07-22',
    departureTime: '13:45',
    arrivalTime: '16:30',
    duration: '14h 45m',
    airline: 'Japan Airlines',
    price: 1200,
    stops: 1,
  },
  {
    id: 'flight-4',
    title: 'New York to Paris',
    departureAirport: 'JFK',
    arrivalAirport: 'CDG',
    departureDate: '2023-07-25',
    departureTime: '19:30',
    arrivalTime: '08:45',
    duration: '7h 15m',
    airline: 'Air France',
    price: 580,
    stops: 0,
  },
  {
    id: 'flight-5',
    title: 'New York to Rome',
    departureAirport: 'JFK',
    arrivalAirport: 'FCO',
    departureDate: '2023-07-30',
    departureTime: '17:15',
    arrivalTime: '07:30',
    duration: '8h 15m',
    airline: 'Alitalia',
    price: 720,
    stops: 0,
  },
];

// Function to search for hotels
export async function searchHotels(query: string, sortBy: 'price' | 'time' = 'price'): Promise<any[]> {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const normalizedQuery = query.toLowerCase();
  
  // Search hotels by name or location
  const results = hotelsDatabase.filter(hotel => 
    hotel.name.toLowerCase().includes(normalizedQuery) || 
    hotel.location.toLowerCase().includes(normalizedQuery)
  );
  
  // Sort results
  if (sortBy === 'price') {
    return results.sort((a, b) => a.price - b.price).map(hotel => ({
      id: hotel.id,
      title: hotel.name,
      location: hotel.location,
      date: 'Available',
      price: hotel.price,
    }));
  } else {
    // For hotels, sorting by "time" doesn't make sense, so we'll sort by rating
    return results.sort((a, b) => b.rating - a.rating).map(hotel => ({
      id: hotel.id,
      title: hotel.name,
      location: hotel.location,
      date: 'Available',
      price: hotel.price,
    }));
  }
}

// Function to search for transport (rides or flights)
export async function searchTransport(
  query: string, 
  type: 'ride' | 'flight', 
  sortBy: 'price' | 'time' = 'price'
): Promise<any[]> {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const normalizedQuery = query.toLowerCase();
  
  if (type === 'ride') {
    // Search rides by location or destination
    const results = ridesDatabase.filter(ride => 
      ride.location.toLowerCase().includes(normalizedQuery) || 
      ride.destination.toLowerCase().includes(normalizedQuery) ||
      ride.title.toLowerCase().includes(normalizedQuery)
    );
    
    // Sort results
    if (sortBy === 'price') {
      return results.sort((a, b) => a.price - b.price).map(ride => ({
        id: ride.id,
        title: ride.title,
        location: `${ride.location} to ${ride.destination}`,
        date: ride.date,
        time: ride.time,
        price: ride.price,
      }));
    } else {
      // Sort by time (assuming earlier is better)
      return results.sort((a, b) => 
        a.time.localeCompare(b.time)
      ).map(ride => ({
        id: ride.id,
        title: ride.title,
        location: `${ride.location} to ${ride.destination}`,
        date: ride.date,
        time: ride.time,
        price: ride.price,
      }));
    }
  } else {
    // Search flights by airport or title
    const results = flightsDatabase.filter(flight => 
      flight.departureAirport.toLowerCase().includes(normalizedQuery) || 
      flight.arrivalAirport.toLowerCase().includes(normalizedQuery) ||
      flight.title.toLowerCase().includes(normalizedQuery)
    );
    
    // Sort results
    if (sortBy === 'price') {
      return results.sort((a, b) => a.price - b.price).map(flight => ({
        id: flight.id,
        title: flight.title,
        location: `${flight.departureAirport} to ${flight.arrivalAirport}`,
        date: flight.departureDate,
        time: `${flight.departureTime} - ${flight.arrivalTime}`,
        price: flight.price,
      }));
    } else {
      // Sort by duration (assuming shorter is better)
      return results.sort((a, b) => 
        a.duration.localeCompare(b.duration)
      ).map(flight => ({
        id: flight.id,
        title: flight.title,
        location: `${flight.departureAirport} to ${flight.arrivalAirport}`,
        date: flight.departureDate,
        time: `${flight.departureTime} - ${flight.arrivalTime}`,
        price: flight.price,
      }));
    }
  }
}