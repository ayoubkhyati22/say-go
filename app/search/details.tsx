import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Platform,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  ArrowLeft,
  Share,
  Star,
  MapPin,
  Calendar,
  Clock,
  Users,
  Wifi,
  Coffee,
  Car,
  Building2,
  PlaneTakeoff,
  Heart,
} from 'lucide-react-native';
import { BlurView } from 'expo-blur';
import { useTheme } from '@/context/ThemeContext';
import {
  getDestinationById,
  getHotelById,
} from '@/data/travelData';

export default function DetailsScreen() {
  const { id, type } = useLocalSearchParams();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { isDarkMode } = useTheme();
  const [isFavorite, setIsFavorite] = useState(false);

  // Get the item details based on type and id
  const getItem = () => {
    if (type === 'destination') {
      return getDestinationById(id as string);
    } else if (type === 'hotel') {
      return getHotelById(id as string);
    } else {
      // For rides and flights, we would fetch from their respective data
      // For simplicity, we'll return a placeholder
      return {
        id: id,
        name: 'Item Details',
        description: 'Details not available',
      };
    }
  };

  const item = getItem();

  if (!item) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <Text style={styles.errorText}>Item not found</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backLink}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const handleBooking = () => {
    // Navigate to booking confirmation screen
    router.push('/bookings');
  };

  const backgroundColor = isDarkMode ? styles.darkBackground : styles.lightBackground;
  const textColor = isDarkMode ? styles.darkText : styles.lightText;

  return (
    <View style={[styles.container, backgroundColor]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          {type === 'destination' && (
            <Image
              source={{ uri: item.imageUrl }}
              style={styles.image}
              resizeMode="cover"
            />
          )}
          {type === 'hotel' && (
            <Image
              source={{ uri: item.imageUrl }}
              style={styles.image}
              resizeMode="cover"
            />
          )}

          <View style={[styles.header, { paddingTop: insets.top }]}>
            <TouchableOpacity
              style={styles.headerButton}
              onPress={() => router.back()}
            >
              <ArrowLeft size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <View style={styles.headerRightButtons}>
              <TouchableOpacity style={styles.headerButton}>
                <Share size={24} color="#FFFFFF" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.headerButton}
                onPress={toggleFavorite}
              >
                <Heart
                  size={24}
                  color="#FFFFFF"
                  fill={isFavorite ? '#EF4444' : 'none'}
                />
              </TouchableOpacity>
            </View>
          </View>

          {type === 'hotel' && (
            <View style={styles.priceTag}>
              <Text style={styles.priceText}>${item.price}/night</Text>
            </View>
          )}
        </View>

        <View style={styles.detailsContainer}>
          <Text style={[styles.title, textColor]}>
            {item.name || item.title}
          </Text>

          {(type === 'destination' || type === 'hotel') && (
            <View style={styles.locationContainer}>
              <MapPin size={16} color={isDarkMode ? '#60A5FA' : '#3B82F6'} />
              <Text style={[styles.locationText, textColor]}>
                {item.location}
              </Text>
            </View>
          )}

          {(type === 'destination' || type === 'hotel') && (
            <View style={styles.ratingContainer}>
              <Star size={16} color="#F59E0B" fill="#F59E0B" />
              <Text style={[styles.ratingText, textColor]}>
                {item.rating} ({item.reviews} reviews)
              </Text>
            </View>
          )}

          {type === 'destination' && (
            <View style={styles.infoContainer}>
              <View style={styles.infoItem}>
                <Calendar size={16} color={isDarkMode ? '#60A5FA' : '#3B82F6'} />
                <Text style={[styles.infoText, textColor]}>
                  Best time: {item.duration}
                </Text>
              </View>
              <View style={styles.infoItem}>
                <Clock size={16} color={isDarkMode ? '#60A5FA' : '#3B82F6'} />
                <Text style={[styles.infoText, textColor]}>
                  {item.trend}
                </Text>
              </View>
            </View>
          )}

          {type === 'hotel' && (
            <View style={styles.amenitiesContainer}>
              <Text style={[styles.sectionTitle, textColor]}>Amenities</Text>
              <View style={styles.amenitiesList}>
                {item.amenities.map((amenity, index) => (
                  <View key={index} style={styles.amenityItem}>
                    {getAmenityIcon(amenity, isDarkMode)}
                    <Text style={[styles.amenityText, textColor]}>
                      {amenity}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          <View style={styles.descriptionContainer}>
            <Text style={[styles.sectionTitle, textColor]}>Description</Text>
            <Text style={[styles.descriptionText, textColor]}>
              {item.description}
            </Text>
          </View>

          {type === 'hotel' && (
            <View style={styles.availabilityContainer}>
              <View style={styles.datePickerContainer}>
                <Text style={[styles.datePickerLabel, textColor]}>Check-in</Text>
                <TouchableOpacity style={styles.datePicker}>
                  <Calendar size={16} color={isDarkMode ? '#60A5FA' : '#3B82F6'} />
                  <Text style={[styles.datePickerText, textColor]}>
                    Select date
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.datePickerContainer}>
                <Text style={[styles.datePickerLabel, textColor]}>Check-out</Text>
                <TouchableOpacity style={styles.datePicker}>
                  <Calendar size={16} color={isDarkMode ? '#60A5FA' : '#3B82F6'} />
                  <Text style={[styles.datePickerText, textColor]}>
                    Select date
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <BlurView
          intensity={80}
          style={StyleSheet.absoluteFill}
          tint={isDarkMode ? 'dark' : 'light'}
        />
        <View style={styles.bottomBarContent}>
          {type === 'hotel' && (
            <View style={styles.priceContainer}>
              <Text style={styles.priceLabel}>Price</Text>
              <Text style={styles.priceValue}>${item.price} <Text style={styles.priceUnit}>/night</Text></Text>
            </View>
          )}
          <TouchableOpacity
            style={styles.bookButton}
            onPress={handleBooking}
          >
            <Text style={styles.bookButtonText}>
              {type === 'destination' ? 'Explore Options' : 'Book Now'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

// Helper function to get icons for amenities
function getAmenityIcon(amenity: string, isDarkMode: boolean) {
  const color = isDarkMode ? '#60A5FA' : '#3B82F6';
  const size = 16;

  const amenityLower = amenity.toLowerCase();

  if (amenityLower.includes('wifi')) {
    return <Wifi size={size} color={color} />;
  } else if (amenityLower.includes('breakfast') || amenityLower.includes('restaurant')) {
    return <Coffee size={size} color={color} />;
  } else if (amenityLower.includes('shuttle') || amenityLower.includes('parking')) {
    return <Car size={size} color={color} />;
  } else if (amenityLower.includes('spa') || amenityLower.includes('pool')) {
    return <Spa size={size} color={color} />;
  } else if (amenityLower.includes('fitness') || amenityLower.includes('gym')) {
    return <Dumbbell size={size} color={color} />;
  } else {
    return <Dot size={size} color={color} />;
  }
}

// Custom components for icons not included in Lucide core
function Spa(props: any) {
  return <Icon name="Spa" {...props} />;
}

function Dumbbell(props: any) {
  return <Icon name="Dumbbell" {...props} />;
}

function Dot(props: any) {
  return <Icon name="Dot" {...props} />;
}

function Icon({ name, size, color }: { name: string; size: number; color: string }) {
  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ width: size / 2, height: size / 2, borderRadius: size / 4, backgroundColor: color }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  lightBackground: {
    backgroundColor: '#FFFFFF',
  },
  darkBackground: {
    backgroundColor: '#121212',
  },
  lightText: {
    color: '#111827',
  },
  darkText: {
    color: '#F3F4F6',
  },
  imageContainer: {
    width: '100%',
    height: 300,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
  },
  headerRightButtons: {
    flexDirection: 'row',
  },
  priceTag: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(59, 130, 246, 0.9)',
    borderRadius: 8,
  },
  priceText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  detailsContainer: {
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    marginLeft: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  ratingText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    marginLeft: 4,
  },
  infoContainer: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  infoText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    marginLeft: 4,
  },
  amenitiesContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 12,
  },
  amenitiesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  amenityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
    marginBottom: 8,
  },
  amenityText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    marginLeft: 8,
  },
  descriptionContainer: {
    marginBottom: 24,
  },
  descriptionText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    lineHeight: 22,
  },
  availabilityContainer: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  datePickerContainer: {
    flex: 1,
    marginRight: 8,
  },
  datePickerLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    marginBottom: 4,
  },
  datePicker: {
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  datePickerText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    marginLeft: 8,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    overflow: 'hidden',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  bottomBarContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
    height: '100%',
  },
  priceContainer: {
    flex: 1,
  },
  priceLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  priceValue: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#3B82F6',
  },
  priceUnit: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  bookButton: {
    backgroundColor: '#3B82F6',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  bookButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  errorText: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#EF4444',
    textAlign: 'center',
    marginTop: 24,
  },
  backLink: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#3B82F6',
    textAlign: 'center',
    marginTop: 16,
  },
});