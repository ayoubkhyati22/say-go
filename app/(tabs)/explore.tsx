import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity, 
  StatusBar,
  Image,
  ImageBackground,
  Dimensions
} from 'react-native';
import { Search } from '../../components/Search';
import { MapPin, Calendar, Star, Navigation2, ChevronRight, Leaf, Train } from 'lucide-react-native';
import { useRouter } from 'expo-router';

interface PopularDestination {
  id: string;
  name: string;
  imagePlaceholder: string; // We'll use placeholder in this example
  rating: number;
  totalTrips: number;
  averageCO2: string;
}

interface DestinationCategory {
  id: string;
  title: string;
  description?: string;
  destinations: PopularDestination[];
}

export default function ExploreScreen() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  
  // Sample destination categories
  const [categories] = useState<DestinationCategory[]>([
    {
      id: 'popular',
      title: 'Popular Destinations',
      description: 'Explore the most visited places with carbon offset options',
      destinations: [
        {
          id: '1',
          name: 'Marrakech',
          imagePlaceholder: 'marrakech',
          rating: 4.8,
          totalTrips: 128,
          averageCO2: '4.2 kg'
        },
        {
          id: '2',
          name: 'Tangier',
          imagePlaceholder: 'tangier',
          rating: 4.6,
          totalTrips: 85,
          averageCO2: '3.8 kg'
        },
        {
          id: '3',
          name: 'Fes',
          imagePlaceholder: 'fes',
          rating: 4.7,
          totalTrips: 92,
          averageCO2: '4.1 kg'
        },
      ]
    },
    {
      id: 'eco',
      title: 'Eco-Friendly Routes',
      description: 'Routes with the lowest carbon footprint',
      destinations: [
        {
          id: '4',
          name: 'Rabat - Casablanca',
          imagePlaceholder: 'rabat',
          rating: 4.9,
          totalTrips: 210,
          averageCO2: '1.8 kg'
        },
        {
          id: '5',
          name: 'Tangier - Tetouan',
          imagePlaceholder: 'tetouan',
          rating: 4.7,
          totalTrips: 75,
          averageCO2: '1.5 kg'
        },
        {
          id: '6',
          name: 'Casablanca - El Jadida',
          imagePlaceholder: 'eljadida',
          rating: 4.5,
          totalTrips: 62,
          averageCO2: '2.0 kg'
        },
      ]
    }
  ]);

  const handleSearch = (text: string) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      router.push('/search');
    }, 1500);
  };

  const navigateToDestination = (destinationId: string) => {
    router.push('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1E3A8A" />
      
      {/* Header with Search */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Explore</Text>
          <Text style={styles.headerSubtitle}>Discover low-carbon destinations</Text>
        </View>
        
        {/* Search Component */}
        <Search 
          onSearch={handleSearch}
          isLoading={isLoading}
        />
      </View>
      
      <ScrollView style={styles.content}>
        {/* Stats Banner */}
        <View style={styles.statsBanner}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>1,346</Text>
            <Text style={styles.statLabel}>Total CO2 Offset</Text>
          </View>
          
          <View style={styles.statsLine} />
          
          <View style={styles.statItem}>
            <Text style={styles.statValue}>84</Text>
            <Text style={styles.statLabel}>Trees Planted</Text>
          </View>
        </View>
        
        {/* Map Card */}
        <TouchableOpacity style={styles.mapCard}>
          <View style={styles.mapPreview}>
            {/* This would be a real map in a production app */}
            <View style={styles.mapPlaceholder}>
              <Navigation2 size={32} color="#246BFD" />
            </View>
          </View>
          
          <View style={styles.mapCardContent}>
            <Text style={styles.mapCardTitle}>View CO2 Map</Text>
            <Text style={styles.mapCardDescription}>
              See destinations by carbon footprint
            </Text>
            <View style={styles.mapCardButton}>
              <Text style={styles.mapCardButtonText}>Open Map</Text>
              <ChevronRight size={16} color="#246BFD" />
            </View>
          </View>
        </TouchableOpacity>
        
        {/* Categories */}
        {categories.map((category) => (
          <View key={category.id} style={styles.category}>
            <View style={styles.categoryHeader}>
              <Text style={styles.categoryTitle}>{category.title}</Text>
              <TouchableOpacity>
                <Text style={styles.seeAllText}>See All</Text>
              </TouchableOpacity>
            </View>
            
            {category.description && (
              <Text style={styles.categoryDescription}>{category.description}</Text>
            )}
            
            <ScrollView 
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.destinationsContainer}
            >
              {category.destinations.map((destination) => (
                <TouchableOpacity 
                  key={destination.id}
                  style={styles.destinationCard}
                  onPress={() => navigateToDestination(destination.id)}
                >
                  <View style={styles.destinationImageContainer}>
                    <View style={styles.destinationImage}>
                      {/* This would be a real image in a production app */}
                      <Text style={styles.destinationImageText}>
                        {destination.name.charAt(0)}
                      </Text>
                    </View>
                    
                    {category.id === 'eco' && (
                      <View style={styles.ecoBadge}>
                        <Leaf size={12} color="#10B981" />
                      </View>
                    )}
                  </View>
                  
                  <View style={styles.destinationInfo}>
                    <Text style={styles.destinationName}>{destination.name}</Text>
                    
                    <View style={styles.destinationMeta}>
                      <View style={styles.ratingContainer}>
                        <Star size={14} color="#FBBF24" fill="#FBBF24" style={styles.ratingIcon} />
                        <Text style={styles.ratingText}>{destination.rating}</Text>
                      </View>
                      
                      <View style={styles.co2Container}>
                        <Train size={14} color="#6B7280" style={styles.co2Icon} />
                        <Text style={styles.co2Text}>{destination.averageCO2}</Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        ))}
        
        {/* Green Travel Tips */}
        <View style={styles.tipsSection}>
          <Text style={styles.tipsTitle}>Green Travel Tips</Text>
          
          <View style={styles.tipCard}>
            <View style={styles.tipIconContainer}>
              <Leaf size={24} color="#10B981" />
            </View>
            <View style={styles.tipContent}>
              <Text style={styles.tipTitle}>Choose Trains over Planes</Text>
              <Text style={styles.tipDescription}>
                Trains emit up to 80% less CO2 than airplanes for the same journey.
              </Text>
            </View>
          </View>
          
          <TouchableOpacity style={styles.moreTipsButton}>
            <Text style={styles.moreTipsText}>View All Tips</Text>
            <ChevronRight size={16} color="#246BFD" />
          </TouchableOpacity>
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
    backgroundColor: '#1E3A8A',
    paddingTop: 20,
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  headerContent: {
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
  statsBanner: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#246BFD',
    marginBottom: 4,
    fontFamily: 'Inter-Bold',
  },
  statLabel: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: 'Inter-Regular',
  },
  statsLine: {
    width: 1,
    height: '100%',
    backgroundColor: '#E5E7EB',
  },
  mapCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  mapPreview: {
    height: 120,
    backgroundColor: '#E5E7EB',
  },
  mapPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapCardContent: {
    padding: 16,
  },
  mapCardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
    fontFamily: 'Inter-SemiBold',
  },
  mapCardDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
    fontFamily: 'Inter-Regular',
  },
  mapCardButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mapCardButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#246BFD',
    marginRight: 4,
    fontFamily: 'Inter-Medium',
  },
  category: {
    marginBottom: 24,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    fontFamily: 'Inter-SemiBold',
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#246BFD',
    fontFamily: 'Inter-Medium',
  },
  categoryDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
    fontFamily: 'Inter-Regular',
  },
  destinationsContainer: {
    paddingBottom: 8,
    paddingRight: 16,
  },
  destinationCard: {
    width: 160,
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  destinationImageContainer: {
    position: 'relative',
  },
  destinationImage: {
    height: 100,
    backgroundColor: '#246BFD',
    justifyContent: 'center',
    alignItems: 'center',
  },
  destinationImageText: {
    fontSize: 32,
    fontWeight: '700',
    color: 'white',
    fontFamily: 'Inter-Bold',
  },
  ecoBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  destinationInfo: {
    padding: 12,
  },
  destinationName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 8,
    fontFamily: 'Inter-SemiBold',
  },
  destinationMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingIcon: {
    marginRight: 4,
  },
  ratingText: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: 'Inter-Regular',
  },
  co2Container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  co2Icon: {
    marginRight: 4,
  },
  co2Text: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: 'Inter-Regular',
  },
  tipsSection: {
    marginBottom: 24,
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 12,
    fontFamily: 'Inter-SemiBold',
  },
  tipCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  tipIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  tipContent: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
    fontFamily: 'Inter-SemiBold',
  },
  tipDescription: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: 'Inter-Regular',
  },
  moreTipsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  moreTipsText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#246BFD',
    marginRight: 4,
    fontFamily: 'Inter-Medium',
  },
});