import { useState, useEffect, useCallback } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  SafeAreaView, 
  ScrollView, 
  StatusBar, 
  TouchableOpacity,
  TextInput,
  ActivityIndicator
} from 'react-native';
import { Search as SearchComponent } from '../../components/Search';
import { RecentSearches } from '../../components/RecentSearches';
import { JourneyCard } from '../../components/JourneyCard';
import { ChevronLeft, Calendar, MapPin } from 'lucide-react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';
import { Journey } from '@/types';
import { searchTravelOptions } from '@/services/api';

export default function SearchScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<Array<Journey & { isSaved: boolean }>>([]);
  const [hasPerformedSearch, setHasPerformedSearch] = useState(false);
  const { colors, isDarkMode } = useTheme();
  
  // Extract route parameters if available
  const fromStation = params.from?.toString() || 'Casa Voyageurs';
  const toStation = params.to?.toString() || 'Tanger Ville';
  const date = params.date?.toString() || 'Today';

  // Memoized search function to prevent recreating on every render
  const handleSearch = useCallback(async (text: string) => {
    if (!text.trim() || isLoading) return;
    
    setIsLoading(true);
    try {
      const journeys = await searchTravelOptions(text);
      const journeysWithSaveState = journeys.map(journey => ({
        ...journey,
        isSaved: false
      }));
      setSearchResults(journeysWithSaveState);
      setHasPerformedSearch(true);
    } catch (error) {
      console.error('Error fetching search results:', error);
      // Keep previous results on error
      if (searchResults.length === 0) {
        const mockJourneys = getMockJourneys().map(journey => ({
          ...journey,
          isSaved: false
        }));
        setSearchResults(mockJourneys);
      }
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);

  // Check if we have results passed from another screen
  useEffect(() => {
    if (params.results) {
      try {
        const parsedResults = JSON.parse(params.results.toString());
        if (Array.isArray(parsedResults) && parsedResults.length > 0) {
          setSearchResults(parsedResults);
          setHasPerformedSearch(true);
        }
      } catch (error) {
        console.error('Error parsing results from params:', error);
      }
    }
  }, [params.results]);

  const handleToggleSave = (id: number) => {
    setSearchResults(prevResults =>
      prevResults.map(journey => 
        journey.index === id 
          ? { ...journey, isSaved: !journey.isSaved } 
          : journey
      )
    );
  };

  const handleSearchSelect = useCallback((search: string) => {
    handleSearch(search);
  }, [handleSearch]);

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
        ) : isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={[styles.loadingText, { color: colors.text }]}>
              Finding the best routes...
            </Text>
          </View>
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
                  <Text style={[styles.pillText, { color: colors.primary }]}>{date}</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.pill}>
                  <MapPin size={16} color={colors.primary} style={styles.pillIcon} />
                  <Text style={[styles.pillText, { color: colors.primary }]}>
                    {fromStation} → {toStation}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            
            <View style={styles.resultsList}>
              {searchResults.length > 0 ? (
                searchResults.map((journeyItem) => (
                  <JourneyCard 
                    key={journeyItem.index}
                    index={journeyItem.index}
                    campany={journeyItem.campany}
                    journey={journeyItem}
                    isSaved={journeyItem.isSaved}
                    onToggleSave={() => handleToggleSave(journeyItem.index)}
                  />
                ))
              ) : (
                <View style={styles.noResultsContainer}>
                  <Text style={[styles.noResultsText, { color: colors.text }]}>
                    No journeys found for this search.
                  </Text>
                  <Text style={[styles.noResultsSubtext, { color: colors.secondaryText }]}>
                    Try adjusting your search criteria.
                  </Text>
                </View>
              )}
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
    paddingHorizontal: 10,
    paddingTop: 50,
    paddingBottom: 0,
  },
  content: {
    flex: 1,
    paddingHorizontal: 10,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    fontFamily: 'Inter-Medium',
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
  noResultsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  noResultsText: {
    fontSize: 18,
    fontFamily: 'Inter-Medium',
    marginBottom: 8,
  },
  noResultsSubtext: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
});