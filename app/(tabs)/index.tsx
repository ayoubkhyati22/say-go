import React, { useState, useMemo } from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView, StatusBar, Image } from 'react-native';
import { Search } from '../../components/Search';
import { RecentSearches } from '../../components/RecentSearches';
import { JourneyCard } from '../../components/JourneyCard';
import { useRouter } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';
import { Journey, JourneyDetails } from '@/types';
import { searchTravelOptions } from '../../services/api';


export default function HomeScreen() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { colors, isDarkMode } = useTheme();

  // Pre-load all image assets
  const images = useMemo(() => {
    return {
      royaumeMaroc: {
        light: require('../../assets/images/royaume-maroc.svg'),
        dark: require('../../assets/images/royaume-maroc.svg')
      },
      oncf: {
        light: require('../../assets/images/oncf.svg'),
        dark: require('../../assets/images/oncf-dark.svg')
      },
      ctm: {
        light: require('../../assets/images/ctm.svg'),
        dark: require('../../assets/images/ctm-dark.svg')
      },
      booking: {
        light: require('../../assets/images/booking.svg'),
        dark: require('../../assets/images/booking-dark.svg')
      },
      airbnb: {
        light: require('../../assets/images/airbnb.svg'),
        dark: require('../../assets/images/airbnb-dark.svg')
      }
    };
  }, []);

  const [journeys] = useState<Array<Journey & { isSaved: boolean }>>([
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
      },
      isSaved: false
    }
  ]);

  const handleSearch = async (text: string) => {
    setIsLoading(true);
    try {
      const journeys = await searchTravelOptions(text);
      
      // Update with isSaved property for each journey
      const journeysWithSaveState = journeys.map(journey => ({
        ...journey,
        isSaved: false // Default state
      }));
      
      // You could store these in state if needed
      // setSearchResults(journeysWithSaveState);
      
      // Navigate to search results
      router.push({
        pathname: '/search',
        params: { results: JSON.stringify(journeysWithSaveState) }
      });
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleToggleSave = (id: string) => {
    console.log('Toggling save for journey:', id);
  };

  const handleSearchSelect = (search: string) => {
    handleSearch(search);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} backgroundColor={colors.header.background} />

      <View style={[styles.header, { backgroundColor: colors.header.background }]}>
        <Image source={isDarkMode ? images.royaumeMaroc.dark : images.royaumeMaroc.light} />

        <View style={styles.headerContent}>
          <Text style={[styles.headerTitle, { color: colors.header.text }]}>SayGo</Text>
          <Text style={[styles.headerSubtitle, { color: colors.header.text }]}>Welcome to your traveling application</Text>
        </View>

        <Search
          onSearch={handleSearch}
          isLoading={isLoading}
        />
      </View>

      <ScrollView style={styles.content}>
        <RecentSearches onSearchSelect={handleSearchSelect} />

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Our Partners</Text>
          <View style={styles.partnersContainer}>
            <Image
              source={isDarkMode ? images.oncf.dark : images.oncf.light}
              style={styles.partnerLogo}
              resizeMode="contain"
            />
            <Image
              source={isDarkMode ? images.ctm.dark : images.ctm.light}
              style={styles.partnerLogo}
              resizeMode="contain"
            />
            <Image
              source={isDarkMode ? images.booking.dark : images.booking.light}
              style={styles.partnerLogo}
              resizeMode="contain"
            />
            <Image
              source={isDarkMode ? images.airbnb.dark : images.airbnb.light}
              style={styles.partnerLogo}
              resizeMode="contain"
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Popular Routes</Text>

          {journeys.map((journey, index) => (
            <JourneyCard
              campany={journey.campany}
              journey={journey}
              index={index}
              isSaved={journey.isSaved}
              onToggleSave={() => handleToggleSave(journey.index.toString())}
            />
          ))}
        </View>

        <View style={{ height: 80 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 20,
    paddingHorizontal: 16,
    paddingBottom: 0,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    backgroundImage: `url(${require('../../assets/images/travel.jpg')})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  headerContent: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
  },
  headerSubtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    opacity: 0.8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 10,
  },
  section: {
    marginTop: 24,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 12,
  },
  partnersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  partnerLogo: {
    width: 70,
    height: 50,
  },
});