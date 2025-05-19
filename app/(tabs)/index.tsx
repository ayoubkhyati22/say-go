import React, { useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView, StatusBar, Image } from 'react-native';
import { Search } from '../../components/Search';
import { RecentSearches } from '../../components/RecentSearches';
import { JourneyCard } from '../../components/JourneyCard';
import { useRouter } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';

export default function HomeScreen() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { colors, isDarkMode } = useTheme();

  const [journeys] = useState<Array<JourneyDetails & { isSaved: boolean }>>([
    {
      gender: 'oncf',
      id: '1',
      departureTime: '08:30',
      arrivalTime: '10:45',
      duration: '2h 15m',
      departureStation: { name: 'Casa Voyageurs', code: 'CVG' },
      arrivalStation: { name: 'Tanger Ville', code: 'TNV' },
      price: 210,
      currency: 'DH',
      trainNumber: 'A102',
      isSaved: true
    }
  ]);

  const handleSearch = (text: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push('/search');
    }, 1500);
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
        <Image source={require('../../assets/images/royaume-maroc.svg')} />

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
              source={require('../../assets/images/oncf.svg')}
              style={styles.partnerLogo}
              resizeMode="contain"
            />
            <Image
              source={require('../../assets/images/ctm.svg')}
              style={styles.partnerLogo}
              resizeMode="contain"
            />
            <Image
              source={require('../../assets/images/booking.svg')}
              style={styles.partnerLogo}
              resizeMode="contain"
            />
            <Image
              source={require('../../assets/images/airbnb.svg')}
              style={styles.partnerLogo}
              resizeMode="contain"
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Popular Routes</Text>

          {journeys.map((journey, index) => (
            <JourneyCard
              key={journey.id}
              journey={journey}
              index={index}
              isSaved={journey.isSaved}
              onToggleSave={() => handleToggleSave(journey.id)}
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
    paddingBottom: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
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
    paddingHorizontal: 16,
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