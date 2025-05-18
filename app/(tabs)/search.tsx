import { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  SafeAreaView, 
  ScrollView, 
  StatusBar, 
  TouchableOpacity,
  TextInput
} from 'react-native';
import { Search as SearchComponent } from '../../components/Search';
import { RecentSearches } from '../../components/RecentSearches';
import { JourneyCard } from '../../components/JourneyCard';
import { ChevronLeft, Calendar, MapPin } from 'lucide-react-native';
import { useRouter } from 'expo-router';

// Types from your existing components
interface Station {
  name: string;
  code: string;
}

interface JourneyDetails {
  gender: string;
  id: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  departureStation: Station;
  arrivalStation: Station;
  price: number;
  currency: string;
  trainNumber: string;
  co2Emission?: string;
  distance?: string;
}

export default function SearchScreen() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Array<JourneyDetails & { isSaved: boolean }>>([]);
  const [hasPerformedSearch, setHasPerformedSearch] = useState(false);
  
  // Sample search results data
  const sampleSearchResults = [
    {
      gender: 'oncf',
      id: '1',
      departureTime: '08:30',
      arrivalTime: '10:45',
      duration: '2h 15m',
      departureStation: { name: 'Casa Voyageurs', code: 'CVG' },
      arrivalStation: { name: 'Tanger Ville', code: 'TNV' },
      price: 75,
      currency: 'DH',
      trainNumber: 'A102',
      isSaved: false,
      co2Emission: '3.47',
      distance: '1.7 km'
    },
    {
      gender: 'ctm',
      id: '2',
      departureTime: '12:15',
      arrivalTime: '15:30',
      duration: '3h 15m',
      departureStation: { name: 'Casa Voyageurs', code: 'CVG' },
      arrivalStation: { name: 'Tanger Ville', code: 'TNV' },
      price: 180,
      currency: 'DH',
      trainNumber: 'B204',
      isSaved: false,
      co2Emission: '4.82',
      distance: '1.7 km'
    },
    {
      gender: 'oncf',
      id: '3',
      departureTime: '16:00',
      arrivalTime: '18:20',
      duration: '2h 20m',
      departureStation: { name: 'Casa Voyageurs', code: 'CVG' },
      arrivalStation: { name: 'Tanger Ville', code: 'TNV' },
      price: 90,
      currency: 'DH',
      trainNumber: 'C306',
      isSaved: false,
      co2Emission: '3.21',
      distance: '1.7 km'
    }
  ];

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    setIsLoading(true);
    
    // Simulate API search
    setTimeout(() => {
      setSearchResults(sampleSearchResults);
      setIsLoading(false);
      setHasPerformedSearch(true);
    }, 1500);
  };

  const handleToggleSave = (id: string) => {
    setSearchResults(
      searchResults.map(journey => 
        journey.id === id 
          ? { ...journey, isSaved: !journey.isSaved } 
          : journey
      )
    );
  };

  const handleSearchSelect = (search: string) => {
    handleSearch(search);
  };

  const handleGoToBooking = (journeyId: string) => {
    // Navigate to booking screen with journey ID
    router.push(`/bookings/details?id=${journeyId}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1E3A8A" />
      
      {/* Search Header */}
      <View style={styles.searchHeader}>
        <SearchComponent 
          onSearch={handleSearch}
          isLoading={isLoading}
        />
      </View>
      
      <ScrollView style={styles.content}>
        {!hasPerformedSearch ? (
          // Show RecentSearches if no search has been performed
          <RecentSearches onSearchSelect={handleSearchSelect} />
        ) : (
          // Show search results
          <View style={styles.resultsContainer}>
            {/* Search Info */}
            <View style={styles.searchInfo}>
              <Text style={styles.resultsTitle}>Search Results</Text>
              <Text style={styles.resultsSubtitle}>{searchResults.length} trips found</Text>
              
              {/* Date and Location Pills */}
              <View style={styles.pillsContainer}>
                <TouchableOpacity style={styles.pill}>
                  <Calendar size={16} color="#246BFD" style={styles.pillIcon} />
                  <Text style={styles.pillText}>Today</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.pill}>
                  <MapPin size={16} color="#246BFD" style={styles.pillIcon} />
                  <Text style={styles.pillText}>Casa Voyageurs → Tanger Ville</Text>
                </TouchableOpacity>
              </View>
            </View>
            
            {/* CO2 Impact Banner */}
            {/* <View style={styles.co2Banner}>
              <View style={styles.co2IconContainer}>
                <Text style={styles.co2Icon}>🌱</Text>
              </View>
              <View style={styles.co2TextContainer}>
                <Text style={styles.co2Title}>Reduce your CO2 footprint</Text>
                <Text style={styles.co2Description}>
                  Offset your trip's carbon emissions with just a small contribution
                </Text>
              </View>
            </View> */}
            
            {/* Results List */}
            <View style={styles.resultsList}>
              {searchResults.map((journey) => (
                <JourneyCard 
                  key={journey.id}
                  journey={journey}
                  index={parseInt(journey.id)}
                  isSaved={journey.isSaved}
                  onToggleSave={() => handleToggleSave(journey.id)}
                />
              ))}
            </View>
          </View>
        )}
        
        {/* Add padding at the bottom for the tab bar */}
        <View style={{ height: 80 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  searchHeader: {
    backgroundColor: '#1E3A8A',
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 24,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  resultsContainer: {
    marginTop: 16,
  },
  searchInfo: {
    marginBottom: 16,
  },
  resultsTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1A1A1A',
    fontFamily: 'Inter-Bold',
  },
  resultsSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
    fontFamily: 'Inter-Regular',
  },
  pillsContainer: {
    flexDirection: 'row',
    marginTop: 12,
    flexWrap: 'wrap',
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(37, 99, 235, 0.1)',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  pillIcon: {
    marginRight: 6,
  },
  pillText: {
    fontSize: 14,
    color: '#246BFD',
    fontFamily: 'Inter-Medium',
  },
  co2Banner: {
    flexDirection: 'row',
    backgroundColor: '#ECFDF5',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  co2IconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  co2Icon: {
    fontSize: 20,
  },
  co2TextContainer: {
    flex: 1,
  },
  co2Title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#065F46',
    marginBottom: 4,
    fontFamily: 'Inter-SemiBold',
  },
  co2Description: {
    fontSize: 14,
    color: '#047857',
    fontFamily: 'Inter-Regular',
  },
  resultsList: {
    marginBottom: 16,
  },
});