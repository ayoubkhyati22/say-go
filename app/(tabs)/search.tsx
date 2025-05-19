import { useState } from 'react';
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
import { useTheme } from '@/context/ThemeContext';

export default function SearchScreen() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Array<JourneyDetails & { isSaved: boolean }>>([]);
  const [hasPerformedSearch, setHasPerformedSearch] = useState(false);
  const { colors, isDarkMode } = useTheme();
  
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
    // ... other sample results
  ];

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    setIsLoading(true);
    
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

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} backgroundColor={colors.header.background} />
      
      <View style={[styles.searchHeader, { backgroundColor: colors.header.background }]}>
        <SearchComponent 
          onSearch={handleSearch}
          isLoading={isLoading}
        />
      </View>
      
      <ScrollView style={styles.content}>
        {!hasPerformedSearch ? (
          <RecentSearches onSearchSelect={handleSearchSelect} />
        ) : (
          <View style={styles.resultsContainer}>
            <View style={styles.searchInfo}>
              <Text style={[styles.resultsTitle, { color: colors.text }]}>Search Results</Text>
              <Text style={[styles.resultsSubtitle, { color: colors.secondaryText }]}>
                {searchResults.length} trips found
              </Text>
              
              <View style={styles.pillsContainer}>
                <TouchableOpacity style={styles.pill}>
                  <Calendar size={16} color={colors.primary} style={styles.pillIcon} />
                  <Text style={[styles.pillText, { color: colors.primary }]}>Today</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.pill}>
                  <MapPin size={16} color={colors.primary} style={styles.pillIcon} />
                  <Text style={[styles.pillText, { color: colors.primary }]}>
                    Casa Voyageurs → Tanger Ville
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            
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
        
        <View style={{ height: 80 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchHeader: {
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
    fontFamily: 'Inter-Bold',
  },
  resultsSubtitle: {
    fontSize: 14,
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
    fontFamily: 'Inter-Medium',
  },
  resultsList: {
    marginBottom: 16,
  },
});