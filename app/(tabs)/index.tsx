import React, { useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView, StatusBar, Image } from 'react-native';
import { Search } from '../../components/Search';
import { RecentSearches } from '../../components/RecentSearches';
import { JourneyCard } from '../../components/JourneyCard';
import { useRouter } from 'expo-router';

// Define the types based on your existing components
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
}

export default function HomeScreen() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // Sample data for journeys
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
    // Simulate search delay
    setTimeout(() => {
      setIsLoading(false);
      // Navigate to search results
      router.push('/search');
    }, 1500);
  };

  const handleToggleSave = (id: string) => {
    // In a real app, this would update state
    console.log('Toggling save for journey:', id);
  };

  const handleSearchSelect = (search: string) => {
    handleSearch(search);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1E3A8A" />

      {/* Header with blue background */}
      <View style={styles.header}>
        <Image source={require('../../assets/images/royaume-maroc.svg')} />

        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>SayGo</Text>
          <Text style={styles.headerSubtitle}>Welcome to your traveling application</Text>
        </View>

        {/* Search Component */}
        <Search
          onSearch={handleSearch}
          isLoading={isLoading}
        />
      </View>

      {/* Content */}
      <ScrollView style={styles.content}>
        {/* Recent Searches Component */}
        <RecentSearches onSearchSelect={handleSearchSelect} />

        {/* Our Partners Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Our Partners</Text>
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

        {/* Popular Routes Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Popular Routes</Text>

          {/* Journey Cards */}
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
  header: {
    backgroundImage: "linear-gradient(rgba(30, 58, 138, 0.9), rgba(30, 58, 138, 0.5)), url('https://ledesk.ma/wp-content/uploads/2021/07/ONCF-TGV.jpg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    paddingTop: 20,
    paddingHorizontal: 16,
    paddingBottom: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    boxShadow: '0 -8px 16px rgba(0, 0, 0, 0.3)', // Top shadow
  },

  headerContent: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: 'white',
    fontFamily: 'Inter-Bold',
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    fontFamily: 'Inter-Regular',
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
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 12,
    fontFamily: 'Inter-SemiBold',
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