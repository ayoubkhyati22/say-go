// Simple voice input simulation - works without any external dependencies
// This version simulates voice input and shows real-time text updates

import { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  Animated,
  Alert,
  TextInput
} from 'react-native';
import { Search as SearchComponent } from '../../components/Search';
import { RecentSearches } from '../../components/RecentSearches';
import { JourneyCard } from '../../components/JourneyCard';
import { BusFront, Calendar, ClockArrowDown, DollarSign, MapPin, TrainFront, Mic, MicOff, Keyboard } from 'lucide-react-native';
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
  
  // Voice simulation states
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceText, setVoiceText] = useState('');
  const [partialResults, setPartialResults] = useState('');
  const [inputMode, setInputMode] = useState<'voice' | 'text'>('voice');
  
  const { colors, isDarkMode } = useTheme();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const textInputRef = useRef<TextInput>(null);

  // Animation values for voice waves
  const waveAnimations = useRef([
    new Animated.Value(0.3),
    new Animated.Value(0.3),
    new Animated.Value(0.3),
    new Animated.Value(0.3),
    new Animated.Value(0.3),
  ]).current;

  // Predefined voice simulation responses
  const voiceResponses = [
    {
      partials: ['Casa...', 'Casablanca...', 'Casablanca to...', 'Casablanca to Rab...'],
      final: 'Casablanca to Rabat'
    },
    {
      partials: ['Mar...', 'Marrakech...', 'Marrakech to...', 'Marrakech to Fez...'],
      final: 'Marrakech to Fez'
    },
    {
      partials: ['Tan...', 'Tangier...', 'Tangier to...', 'Tangier to Casa...'],
      final: 'Tangier to Casablanca'
    },
    {
      partials: ['Rab...', 'Rabat...', 'Rabat to...', 'Rabat to Mek...'],
      final: 'Rabat to Meknes'
    }
  ];

  const fromStation = searchResults[0]?.journey?.departureStation?.name || 'Undefined';
  const toStation = searchResults[0]?.journey?.arrivalStation?.name || 'Undefined';
  const date = searchResults[0]?.journey?.departureDate || 'Today';

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Simulate voice recognition with realistic text updates
  const simulateVoiceRecognition = () => {
    const randomResponse = voiceResponses[Math.floor(Math.random() * voiceResponses.length)];
    const { partials, final } = randomResponse;
    
    let index = 0;
    const updateText = () => {
      if (index < partials.length && isListening) {
        setPartialResults(partials[index]);
        index++;
        timeoutRef.current = setTimeout(updateText, 800);
      } else if (index >= partials.length && isListening) {
        setVoiceText(final);
        setPartialResults('');
        
        // Auto-search after getting final result
        setTimeout(() => {
          handleSearch(final);
          stopVoiceRecognition();
        }, 1500);
      }
    };
    
    // Start the simulation
    timeoutRef.current = setTimeout(updateText, 500);
  };

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
          item.company === 'oncf'
        );
        break;
      case 'bus':
        filtered = filtered.filter(item => 
          item.company !== 'oncf'
        );
        break;
      default:
        break;
    }

    return filtered;
  }, [searchResults, activeFilter]);

  const handleSearch = useCallback(async (text: string) => {
    if (isLoading) return;

    setIsLoading(true);
    setHasPerformedSearch(true);
    setActiveFilter(null);

    try {
      const results = await searchTravelOptions(text);
      const resultsWithSaveState = results.map(journey => ({
        ...journey,
        isSaved: false
      }));
      setSearchResults(resultsWithSaveState);
      
      Toast.show({
        type: 'success',
        text1: 'Search Complete',
        text2: `Found ${results.length} travel options`,
        position: 'bottom'
      });
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
    setActiveFilter(null);
  };

  const handleVoicePress = () => {
    if (isVoiceActive) {
      stopVoiceRecognition();
    } else {
      startVoiceRecognition();
    }
  };

  const startVoiceRecognition = () => {
    try {
      setIsVoiceActive(true);
      setIsListening(true);
      setVoiceText('');
      setPartialResults('');
      setInputMode('voice');
      startWaveAnimation();
      
      // Start the voice simulation
      simulateVoiceRecognition();
      
    } catch (error) {
      console.error('Failed to start voice recognition:', error);
      setIsVoiceActive(false);
      stopWaveAnimation();
      
      Toast.show({
        type: 'error',
        text1: 'Voice Recognition Failed',
        text2: 'Unable to start voice recognition. Please try again.',
        position: 'bottom'
      });
    }
  };

  const stopVoiceRecognition = () => {
    try {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      setIsVoiceActive(false);
      setIsListening(false);
      stopWaveAnimation();
      setPartialResults('');
      setVoiceText('');
    } catch (error) {
      console.error('Failed to stop voice recognition:', error);
    }
  };

  const handleTextInputMode = () => {
    setInputMode('text');
    setIsVoiceActive(true);
    setTimeout(() => {
      textInputRef.current?.focus();
    }, 100);
  };

  const handleTextSubmit = (text: string) => {
    if (text.trim()) {
      handleSearch(text);
      setIsVoiceActive(false);
      setInputMode('voice');
    }
  };

  const startWaveAnimation = () => {
    const createWaveAnimation = (animatedValue: Animated.Value) => {
      return Animated.loop(
        Animated.sequence([
          Animated.timing(animatedValue, {
            toValue: 1,
            duration: 500,
            useNativeDriver: false,
          }),
          Animated.timing(animatedValue, {
            toValue: 0.3,
            duration: 500,
            useNativeDriver: false,
          }),
        ]),
        { iterations: -1 }
      );
    };

    waveAnimations.forEach((animation, index) => {
      setTimeout(() => {
        createWaveAnimation(animation).start();
      }, index * 100);
    });
  };

  const stopWaveAnimation = () => {
    waveAnimations.forEach(animation => {
      animation.stopAnimation();
      animation.setValue(0.3);
    });
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

      {/* Fixed Search Header */}
      <View style={[styles.searchHeader, { backgroundColor: colors.header.background }]}>
        <SearchComponent
          onSearch={handleSearch}
          isLoading={isLoading}
        />
      </View>

      {/* Content Area */}
      <View style={styles.content}>
        {!hasPerformedSearch ? (
          <ScrollView style={styles.fullScrollView} contentContainerStyle={styles.beforeSearchContent}>
            <RecentSearches onSearchSelect={handleSearchSelect} />
            
            {/* Welcome Section */}
            <View style={styles.welcomeSection}>
              {!isVoiceActive ? (
                <>
                  <View style={styles.welcomeImageContainer}>
                    {/* Welcome image placeholder */}
                  </View>
                  <Text style={[styles.welcomeTitle, { color: colors.text }]}>
                    Find Your Journey
                  </Text>
                  <Text style={[styles.welcomeSubtitle, { color: colors.secondaryText }]}>
                    Search for trains and buses to discover the best travel options for your trip
                  </Text>
                  
                  {/* Voice and Text Input Buttons */}
                  <View style={styles.inputButtonsContainer}>
                    <TouchableOpacity 
                      style={[styles.voiceButton, { backgroundColor: colors.primary }]}
                      onPress={handleVoicePress}
                      activeOpacity={0.8}
                    >
                      <Mic size={16} color="white" />
                      <Text style={styles.voiceButtonText}>Voice Search</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                      style={[styles.textButton, { backgroundColor: colors.secondary || colors.primary }]}
                      onPress={handleTextInputMode}
                      activeOpacity={0.8}
                    >
                      <Keyboard size={16} color="white" />
                      <Text style={styles.voiceButtonText}>Type Search</Text>
                    </TouchableOpacity>
                  </View>
                </>
              ) : inputMode === 'voice' ? (
                <View style={styles.voiceAnimationContainer}>
                  <View style={styles.voiceWavesContainer}>
                    {waveAnimations.map((animation, index) => (
                      <Animated.View
                        key={index}
                        style={[
                          styles.voiceWave,
                          {
                            backgroundColor: isListening ? colors.primary : colors.secondaryText,
                            height: animation.interpolate({
                              inputRange: [0.3, 1],
                              outputRange: [20, 60 + index * 8],
                            }),
                            opacity: animation.interpolate({
                              inputRange: [0.3, 1],
                              outputRange: [0.4, 0.9],
                            }),
                          }
                        ]}
                      />
                    ))}
                  </View>
                  
                  <Text style={[styles.voiceText, { color: colors.text }]}>
                    {isListening ? 'Listening...' : 'Ready to listen'}
                  </Text>
                  
                  <Text style={[styles.voiceSubtext, { color: colors.secondaryText }]}>
                    {isListening ? 'Speak your destination' : 'Tap to start listening'}
                  </Text>

                  {/* Real-time text display */}
                  {(partialResults || voiceText) && (
                    <View style={[styles.voiceTextContainer, { backgroundColor: colors.primary + '10' }]}>
                      <Text style={[styles.voiceResultText, { color: colors.text }]}>
                        {voiceText || partialResults}
                      </Text>
                      {partialResults && !voiceText && (
                        <Text style={[styles.partialResultsLabel, { color: colors.secondaryText }]}>
                          (processing...)
                        </Text>
                      )}
                    </View>
                  )}

                  {/* Stop button */}
                  <TouchableOpacity 
                    style={[styles.stopVoiceButton, { backgroundColor: colors.error || '#ef4444' }]}
                    onPress={handleVoicePress}
                    activeOpacity={0.8}
                  >
                    <MicOff size={16} color="white" />
                    <Text style={styles.voiceButtonText}>Stop</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                // Text Input Mode
                <View style={styles.textInputContainer}>
                  <Text style={[styles.voiceText, { color: colors.text }]}>
                    Type your destination
                  </Text>
                  <Text style={[styles.voiceSubtext, { color: colors.secondaryText }]}>
                    Enter your travel route
                  </Text>
                  
                  <TextInput
                    ref={textInputRef}
                    style={[styles.textInput, { 
                      backgroundColor: colors.primary + '10',
                      color: colors.text,
                      borderColor: colors.primary 
                    }]}
                    placeholder="e.g. Casablanca to Rabat"
                    placeholderTextColor={colors.secondaryText}
                    onSubmitEditing={(e) => handleTextSubmit(e.nativeEvent.text)}
                    returnKeyType="search"
                    autoFocus={true}
                  />
                  
                  <TouchableOpacity 
                    style={[styles.stopVoiceButton, { backgroundColor: colors.secondaryText }]}
                    onPress={() => {
                      setIsVoiceActive(false);
                      setInputMode('voice');
                    }}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.voiceButtonText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
            
            <View style={{ height: 80 }} />
          </ScrollView>
        ) : (
          <View style={styles.resultsContainer}>
            {/* Results section */}
            <View style={[styles.searchInfo, { backgroundColor: colors.background }]}>
              <Text style={[styles.resultsTitle, { color: colors.text }]}>Search Results</Text>
              <Text style={[styles.resultsSubtitle, { color: colors.secondaryText }]}>
                {filteredResults.length} trips found  &nbsp;
                <Text style={[styles.pillText, { color: colors.primary }]}>{date}</Text>
                &nbsp; - &nbsp;
                <Text style={[styles.pillText, { color: colors.primary }]}>
                  {fromStation} → {toStation}
                </Text>
              </Text>

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

              {activeTab === 'transport' && (
                <View style={styles.pillsContainer}>
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

            {isLoading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={colors.primary} />
                <Text style={[styles.loadingText, { color: colors.text }]}>
                  Finding the best routes...
                </Text>
              </View>
            ) : (
              <ScrollView 
                style={styles.resultsList}
                showsVerticalScrollIndicator={true}
                contentContainerStyle={styles.resultsScrollContent}
              >
                {activeTab === 'transport' ? (
                  filteredResults.length > 0 ? (
                    filteredResults.map((journeyItem) => (
                      <JourneyCard
                        key={journeyItem.index}
                        index={journeyItem.index}
                        company={journeyItem.company}
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
                  <View style={styles.noResultsContainer}>
                    <Text style={[styles.noResultsText, { color: colors.text }]}>
                      Stay-related results coming soon
                    </Text>
                    <Text style={[styles.noResultsSubtext, { color: colors.secondaryText }]}>
                      Hotels and accommodation options will be available here.
                    </Text>
                  </View>
                )}
                <View style={{ height: 80 }} />
              </ScrollView>
            )}
          </View>
        )}
      </View>
      <Toast />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchHeader: {
    paddingHorizontal: 12,
    paddingTop: 40,
    paddingBottom: 0,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  content: {
    flex: 1,
    paddingHorizontal: 10,
  },
  fullScrollView: {
    flex: 1,
  },
  beforeSearchContent: {
    flexGrow: 1,
    paddingTop: 20,
  },
  welcomeSection: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  welcomeImageContainer: {
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  welcomeTitle: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  welcomeSubtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 300,
    marginBottom: 24,
  },
  inputButtonsContainer: {
    flexDirection: 'row',
    gap: 12,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  voiceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  textButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  voiceButtonText: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    marginLeft: 8,
  },
  stopVoiceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  voiceAnimationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 300,
    paddingVertical: 40,
  },
  textInputContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 300,
    paddingVertical: 40,
    width: '100%',
  },
  voiceWavesContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    height: 80,
    marginBottom: 30,
  },
  voiceWave: {
    width: 6,
    marginHorizontal: 3,
    borderRadius: 3,
    minHeight: 20,
  },
  voiceText: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    marginBottom: 8,
  },
  voiceSubtext: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
    marginBottom: 20,
  },
  voiceTextContainer: {
    borderRadius: 12,
    padding: 16,
    marginVertical: 16,
    minWidth: 280,
    maxWidth: 320,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  voiceResultText: {
    fontSize: 18,
    fontFamily: 'Inter-Medium',
    textAlign: 'center',
    lineHeight: 24,
  },
  partialResultsLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
    marginTop: 4,
    fontStyle: 'italic',
  },
  textInput: {
    width: '100%',
    maxWidth: 320,
    height: 50,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    borderWidth: 2,
    marginVertical: 16,
    textAlign: 'center',
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
    flex: 1,
    marginTop: 16,
  },
  searchInfo: {
    paddingBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 1,
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
    flex: 1,
  },
  resultsScrollContent: {
    paddingBottom: 20,
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