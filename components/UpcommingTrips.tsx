import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { MapPin, Clock, ArrowRight, X, ChevronRight, TrainFront, House } from 'lucide-react-native';
import { useTheme } from './../context/ThemeContext';

interface UpcommingTripsProps {
  onSearchSelect: (search: string) => void;
}

export function UpcommingTrips({ onSearchSelect }: UpcommingTripsProps) {
  const { colors, isDarkMode } = useTheme();
  
  // Mock data for upcoming trips
  const upcomingTrips = [
    {
      id: 1,
      type: 'transport',
      company: 'oncf',
      title: 'Casablanca to Rabat',
      subtitle: '15/05/2025 · 09:15',
      logo: require('../assets/images/png/oncf.png'), // Adjust path as needed
    },
    {
      id: 2,
      type: 'accommodation',
      company: 'booking',
      title: 'Stay at Hotel Rabat Plaza',
      subtitle: '20/06/2025 · 3 nights',
      logo: require('../assets/images/png/booking.png'), // Adjust path as needed
    }
  ];

  // Mock data for recent searches (keeping original functionality)
  const recentSearches = [
    'Casablanca to Tanger Tomorrow',
    'Rabat Agdal to Fes 29 mai'
  ];

  return (
    <View style={styles.container}>
      {/* Upcoming Trips Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Your Upcoming Trips
          </Text>
          <TouchableOpacity>
            <Text style={[styles.viewAllText, { color: colors.primary }]}>
              View all
            </Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.tripsList}>
          {upcomingTrips.map((trip, index) => (
            <TouchableOpacity 
              key={`trip-${trip.id}`}
              style={[
                styles.tripItem, 
                { 
                  backgroundColor: colors.card,
                  shadowOpacity: isDarkMode ? 0.2 : 0.05,
                  marginBottom: index === upcomingTrips.length - 1 ? 0 : 12
                }
              ]}
              onPress={() => onSearchSelect(trip.title)}
            >
              <View style={styles.tripContent}>
                <View style={styles.logoContainer}>
                  {trip.company === 'oncf' ? (
                    <View style={[styles.logoBackground, { backgroundColor: '#FF6B35' }]}>
                      <TrainFront color={'white'}></TrainFront>
                      {/* <Text style={styles.logoText}>ONCF</Text> */}
                    </View>
                  ) : (
                    <View style={[styles.logoBackground, { backgroundColor: '#003580' }]}>
                      <House color={'white'}></House>
                      {/* <Text style={styles.logoTextBooking}>B.</Text> */}
                    </View>
                  )}
                </View>
                
                <View style={styles.tripInfo}>
                  <Text style={[styles.tripTitle, { color: colors.text }]} numberOfLines={1}>
                    {trip.title}
                  </Text>
                  <Text style={[styles.tripSubtitle, { color: colors.secondaryText }]} numberOfLines={1}>
                    {trip.subtitle}
                  </Text>
                </View>
              </View>
              
              <ChevronRight size={20} color={colors.secondaryText} />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Recent Searches Section (Optional - can be removed if not needed) */}
      {recentSearches.length > 0 && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Recent Searches
            </Text>
            <TouchableOpacity>
              <Text style={[styles.clearText, { color: colors.primary }]}>
                Clear All
              </Text>
            </TouchableOpacity>
          </View>
          
          <View style={[
            styles.recentList, 
            { 
              backgroundColor: colors.card,
              shadowOpacity: isDarkMode ? 0.2 : 0.05
            }
          ]}>
            {recentSearches.map((search, index) => (
              <TouchableOpacity 
                key={`recent-${index}`}
                style={[
                  styles.recentItem, 
                  { 
                    borderBottomColor: colors.border,
                    borderBottomWidth: index === recentSearches.length - 1 ? 0 : StyleSheet.hairlineWidth
                  }
                ]}
                onPress={() => onSearchSelect(search)}
              >
                <Clock size={18} color={colors.secondaryText} style={styles.itemIcon} />
                <Text style={[styles.itemText, { color: colors.secondaryText }]} numberOfLines={1}>
                  {search}
                </Text>
                <TouchableOpacity 
                  style={styles.removeButton}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <X size={16} color={colors.secondaryText} />
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
  },
  viewAllText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
  clearText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
  tripsList: {
    // No additional styling needed, individual items have their own spacing
  },
  tripItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 2,
  },
  tripContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  logoContainer: {
    marginRight: 12,
  },
  logoBackground: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    color: 'white',
    fontSize: 10,
    fontFamily: 'Inter-Bold',
    letterSpacing: 0.5,
  },
  logoTextBooking: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Inter-Bold',
  },
  tripInfo: {
    flex: 1,
  },
  tripTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    marginBottom: 2,
  },
  tripSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
  recentList: {
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 2,
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  itemIcon: {
    marginRight: 12,
  },
  itemText: {
    flex: 1,
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
  removeButton: {
    padding: 4,
  },
});