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
} from 'react-native';
import { Star, Navigation2, ChevronRight, Leaf, Brain as Train } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';

interface PopularDestination {
  id: string;
  name: string;
  imagePlaceholder: string;
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
  const { colors, isDarkMode } = useTheme();
  
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
    setTimeout(() => {
      setIsLoading(false);
      router.push('/search');
    }, 1500);
  };

  const navigateToDestination = (destinationId: string) => {
    router.push('/search');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} backgroundColor={colors.header.background} />
      
      <View style={[styles.header, { backgroundColor: colors.header.background }]}>
        <View style={styles.headerContent}>
          <Text style={[styles.headerTitle, { color: colors.header.text }]}>Explore</Text>
          <Text style={[styles.headerSubtitle, { color: colors.header.text }]}>
            Discover destinations
          </Text>
        </View>
        
      </View>
      
      <ScrollView style={styles.content}>
        <View style={[styles.statsBanner, { backgroundColor: colors.card }]}>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: colors.primary }]}>1,346</Text>
            <Text style={[styles.statLabel, { color: colors.secondaryText }]}>Total CO2 Offset</Text>
          </View>
          
          <View style={[styles.statsLine, { backgroundColor: colors.border }]} />
          
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: colors.primary }]}>84</Text>
            <Text style={[styles.statLabel, { color: colors.secondaryText }]}>Trees Planted</Text>
          </View>
        </View>
        
        <TouchableOpacity style={[styles.mapCard, { backgroundColor: colors.card }]}>
          <View style={styles.mapPreview}>
            <View style={styles.mapPlaceholder}>
              <Navigation2 size={32} color={colors.primary} />
            </View>
          </View>
          
          <View style={styles.mapCardContent}>
            <Text style={[styles.mapCardTitle, { color: colors.text }]}>View CO2 Map</Text>
            <Text style={[styles.mapCardDescription, { color: colors.secondaryText }]}>
              See destinations by carbon footprint
            </Text>
            <View style={styles.mapCardButton}>
              <Text style={[styles.mapCardButtonText, { color: colors.primary }]}>Open Map</Text>
              <ChevronRight size={16} color={colors.primary} />
            </View>
          </View>
        </TouchableOpacity>
        
        {categories.map((category) => (
          <View key={category.id} style={styles.category}>
            <View style={styles.categoryHeader}>
              <Text style={[styles.categoryTitle, { color: colors.text }]}>{category.title}</Text>
              <TouchableOpacity>
                <Text style={[styles.seeAllText, { color: colors.primary }]}>See All</Text>
              </TouchableOpacity>
            </View>
            
            {category.description && (
              <Text style={[styles.categoryDescription, { color: colors.secondaryText }]}>{category.description}</Text>
            )}
            
            <ScrollView 
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.destinationsContainer}
            >
              {category.destinations.map((destination) => (
                <TouchableOpacity 
                  key={destination.id}
                  style={[styles.destinationCard, { backgroundColor: colors.card }]}
                  onPress={() => navigateToDestination(destination.id)}
                >
                  <View style={styles.destinationImageContainer}>
                    <View style={[styles.destinationImage, { backgroundColor: colors.primary }]}>
                      <Text style={[styles.destinationImageText, { color: colors.text }]}>
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
                    <Text style={[styles.destinationName, { color: colors.text }]}>{destination.name}</Text>
                    
                    <View style={styles.destinationMeta}>
                      <View style={styles.ratingContainer}>
                        <Star size={14} color="#FBBF24" fill="#FBBF24" style={styles.ratingIcon} />
                        <Text style={[styles.ratingText, { color: colors.secondaryText }]}>{destination.rating}</Text>
                      </View>
                      
                      <View style={styles.co2Container}>
                        <Train size={14} color={colors.secondaryText} style={styles.co2Icon} />
                        <Text style={[styles.co2Text, { color: colors.secondaryText }]}>{destination.averageCO2}</Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        ))}
        
        <View style={styles.tipsSection}>
          <Text style={[styles.tipsTitle, { color: colors.text }]}>Green Travel Tips</Text>
          
          <View style={[styles.tipCard, { backgroundColor: colors.card }]}>
            <View style={styles.tipIconContainer}>
              <Leaf size={24} color="#10B981" />
            </View>
            <View style={styles.tipContent}>
              <Text style={[styles.tipTitle, { color: colors.text }]}>Choose Trains over Planes</Text>
              <Text style={[styles.tipDescription, { color: colors.secondaryText }]}>
                Trains emit up to 80% less CO2 than airplanes for the same journey.
              </Text>
            </View>
          </View>
          
          <TouchableOpacity style={[styles.moreTipsButton, { backgroundColor: colors.card }]}>
            <Text style={[styles.moreTipsText, { color: colors.primary }]}>View All Tips</Text>
            <ChevronRight size={16} color={colors.primary} />
          </TouchableOpacity>
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
    paddingTop: 24,
    paddingHorizontal: 10,
    paddingBottom: 0,
  },
  headerContent: {
    marginBottom: 10,
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
  statsBanner: {
    flexDirection: 'row',
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
    fontFamily: 'Inter-Bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  statsLine: {
    width: 1,
    height: '100%',
  },
  mapCard: {
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
    fontFamily: 'Inter-SemiBold',
    marginBottom: 4,
  },
  mapCardDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    marginBottom: 16,
  },
  mapCardButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mapCardButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    marginRight: 4,
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
    fontFamily: 'Inter-SemiBold',
  },
  seeAllText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  categoryDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    marginBottom: 12,
  },
  destinationsContainer: {
    paddingBottom: 8,
    paddingRight: 16,
  },
  destinationCard: {
    width: 160,
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  destinationImageText: {
    fontSize: 32,
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
    fontFamily: 'Inter-SemiBold',
    marginBottom: 8,
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
    fontFamily: 'Inter-Regular',
  },
  tipsSection: {
    marginBottom: 24,
  },
  tipsTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 12,
  },
  tipCard: {
    flexDirection: 'row',
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
    fontFamily: 'Inter-SemiBold',
    marginBottom: 4,
  },
  tipDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  moreTipsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
    fontFamily: 'Inter-Medium',
    marginRight: 4,
  },
});