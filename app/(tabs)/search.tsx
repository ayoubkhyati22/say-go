import { useState, useCallback, useMemo } from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  Image
} from 'react-native';
import { Search as SearchComponent } from '../../components/Search';
import { RecentSearches } from '../../components/RecentSearches';
import { JourneyCard } from '../../components/JourneyCard';
import { BusFront, Calendar, ClockArrowDown, DollarSign, MapPin, TrainFront } from 'lucide-react-native';
import { useLocalSearchParams } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';
import { Journey } from '../../types';
import { searchTravelOptions } from '../../services/api';
import Toast from 'react-native-toast-message';

type FilterType = 'cheapest' | 'fast' | 'train' | 'bus' | null;
type TabType = 'transport' | 'stay';

export default function SearchScreen() {
  const params = useLocalSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<Array<Journey & { isSaved: boolean }>>([]);
  const [hasPerformedSearch, setHasPerformedSearch] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterType>(null);
  const [activeTab, setActiveTab] = useState<TabType>('transport');
  const { colors, isDarkMode } = useTheme();

  const fromStation = searchResults[0]?.journey?.departureStation?.name || 'Undefined';
  const toStation = searchResults[0]?.journey?.arrivalStation?.name || 'Undefined';
  const date = searchResults[0]?.journey?.departureDate || 'Today';

  // Helper function to parse duration string to minutes
  const parseDurationToMinutes = (duration: string): number => {
    const match = duration.match(/(\d+)h\s*(\d+)\s*min/);
    if (match) {
      return parseInt(match[1]) * 60 + parseInt(match[2]);
    }
    return 0;
  };

  // Filter and sort the search results based on active filter
  const filteredResults = useMemo(() => {
    let filtered = [...searchResults];

    switch (activeFilter) {
      case 'cheapest':
        filtered.sort((a, b) => a.journey.price - b.journey.price);
        break;
      case 'fast':
        filtered.sort((a, b) => 
          parseDurationToMinutes(a.journey.duration) - parseDurationToMinutes(b.journey.duration)
        );
        break;
      case 'train':
        filtered = filtered.filter(item => 
          item.campany.toLowerCase() === 'oncf' || 
          item.journey.trainNumber !== undefined
        );
        break;
      case 'bus':
        filtered = filtered.filter(item => 
          item.campany.toLowerCase() !== 'oncf' && 
          item.journey.trainNumber === undefined
        );
        break;
      default:
        // No filter applied, return original order
        break;
    }

    return filtered;
  }, [searchResults, activeFilter]);

  const handleSearch = useCallback(async (text: string) => {
    if (isLoading) return; // Prevent multiple simultaneous searches

    setIsLoading(true);
    setHasPerformedSearch(true);
    setActiveFilter(null); // Reset filter when performing new search

    try {
      const results = await searchTravelOptions(text);
      const resultsWithSaveState = results.map(journey => ({
        ...journey,
        isSaved: false
      }));
      setSearchResults(resultsWithSaveState);
    } catch (error) {
      console.error('Search error:', error);
      Toast.show({
        type: 'error',
        text1: 'Search Error',
        text2: 'Unable to fetch search results. Please try again.',
        position: 'bottom'
      });
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);

  const handleToggleSave = (id: number) => {
    setSearchResults(prevResults =>
      prevResults.map(journey =>
        journey.index === id
          ? { ...journey, isSaved: !journey.isSaved }
          : journey
      )
    );
  };

  const handleSearchSelect = (search: string) => {
    handleSearch(search);
  };

  const handleFilterPress = (filterType: FilterType) => {
    setActiveFilter(activeFilter === filterType ? null : filterType);
  };

  const handleTabPress = (tabType: TabType) => {
    setActiveTab(tabType);
    setActiveFilter(null); // Reset filter when switching tabs
  };

  const getTabStyle = (tabType: TabType) => {
    const isActive = activeTab === tabType;
    return [
      styles.tab,
      {
        backgroundColor: isActive 
          ? colors.primary 
          : 'transparent',
        borderBottomWidth: isActive ? 2 : 0,
        borderBottomColor: isActive ? colors.primary : 'transparent'
      }
    ];
  };

  const getTabTextColor = (tabType: TabType) => {
    const isActive = activeTab === tabType;
    return isActive ? "white" : colors.secondaryText;
  };

  const getFilterStyle = (filterType: FilterType) => {
    const isActive = activeFilter === filterType;
    return [
      styles.pill,
      {
        backgroundColor: isActive 
          ? `${colors.success}20` 
          : 'rgba(37, 99, 235, 0.1)'
      }
    ];
  };

  const getFilterTextColor = (filterType: FilterType) => {
    const isActive = activeFilter === filterType;
    return isActive ? colors.success : colors.primary;
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
                {filteredResults.length} trips found  &nbsp;
                <Text style={[styles.pillText, { color: colors.primary }]}>{date}</Text>
                &nbsp; - &nbsp;
                <Text style={[styles.pillText, { color: colors.primary }]}>
                  {fromStation} → {toStation}
                </Text>
              </Text>

              {/* Tabs Section */}
              <View style={styles.tabsContainer}>
                <TouchableOpacity 
                  style={getTabStyle('transport')}
                  onPress={() => handleTabPress('transport')}
                >
                  <Text style={[styles.tabText, { color: getTabTextColor('transport') }]}>
                    Transport-related
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={getTabStyle('stay')}
                  onPress={() => handleTabPress('stay')}
                >
                  <Text style={[styles.tabText, { color: getTabTextColor('stay') }]}>
                    Stay-related
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Filter Pills - Only show for transport tab */}
              {activeTab === 'transport' && (
                <View style={styles.pillsContainer}>
                  <TouchableOpacity 
                    style={getFilterStyle('cheapest')}
                    onPress={() => handleFilterPress('cheapest')}
                  >
                    <DollarSign size={16} color={getFilterTextColor('cheapest')} style={styles.pillIcon} />
                    <Text style={[styles.pillText, { color: getFilterTextColor('cheapest') }]}>Cheapest</Text>
                  </TouchableOpacity>

                  <TouchableOpacity 
                    style={getFilterStyle('fast')}
                    onPress={() => handleFilterPress('fast')}
                  >
                    <ClockArrowDown size={16} color={getFilterTextColor('fast')} style={styles.pillIcon} />
                    <Text style={[styles.pillText, { color: getFilterTextColor('fast') }]}>Fast</Text>
                  </TouchableOpacity>

                  <TouchableOpacity 
                    style={getFilterStyle('train')}
                    onPress={() => handleFilterPress('train')}
                  >
                    <TrainFront size={16} color={getFilterTextColor('train')} style={styles.pillIcon} />
                    <Text style={[styles.pillText, { color: getFilterTextColor('train') }]}>Train</Text>
                  </TouchableOpacity>

                  <TouchableOpacity 
                    style={getFilterStyle('bus')}
                    onPress={() => handleFilterPress('bus')}
                  >
                    <BusFront size={16} color={getFilterTextColor('bus')} style={styles.pillIcon} />
                    <Text style={[styles.pillText, { color: getFilterTextColor('bus') }]}>Bus</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>

            <View style={styles.resultsList}>
              {/* Show different content based on active tab */}
              {activeTab === 'transport' ? (
                filteredResults.length > 0 ? (
                  filteredResults.map((journeyItem) => (
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
                      {activeFilter ? 'No journeys found matching this filter.' : 'No journeys found for this search.'}
                    </Text>
                    <Text style={[styles.noResultsSubtext, { color: colors.secondaryText }]}>
                      {activeFilter ? 'Try selecting a different filter or clearing all filters.' : 'Try adjusting your search criteria.'}
                    </Text>
                  </View>
                )
              ) : (
                // Stay-related tab content
                <View style={styles.noResultsContainer}>
                  <Text style={[styles.noResultsText, { color: colors.text }]}>
                    Stay-related results coming soon
                  </Text>
                  <Text style={[styles.noResultsSubtext, { color: colors.secondaryText }]}>
                    Hotels and accommodation options will be available here.
                  </Text>
                </View>
              )}
            </View>
          </View>
        )}

        <View style={{ height: 80 }} />
      </ScrollView>
      <Toast />
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
  tabsContainer: {
    flexDirection: 'row',
    marginTop: 16,
    marginBottom: 8,
    // borderBottomWidth: 1,
    // borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
  },
  tabText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
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