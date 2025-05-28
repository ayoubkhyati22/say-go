import { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity, 
  StatusBar 
} from 'react-native';
import { Calendar, ArrowRight, Clock, Car, Train } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';

interface Station {
  name: string;
  code: string;
}

interface JourneyDetails {
  id: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  departureStation: Station;
  arrivalStation: Station;
  price: number;
  currency: string;
  trainNumber: string;
  date: string;
  co2Emission?: string;
  offsetCost?: string;
  transportType?: 'train' | 'car' | 'bus' | 'plane';
}

interface Trip {
  id: string;
  journeyDetails: JourneyDetails;
  isSaved: boolean;
  isPaid: boolean;
}

export default function BookingsScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('unpaid');
  const { colors, isDarkMode } = useTheme();
  
  const [trips] = useState<Trip[]>([
    {
      id: '1',
      journeyDetails: {
        id: '17',
        departureTime: '09:00',
        arrivalTime: '11:15',
        duration: '2h 15m',
        departureStation: { name: 'Casa Voyageurs', code: 'CVG' },
        arrivalStation: { name: 'Tanger Ville', code: 'TNV' },
        price: 75,
        currency: 'DH',
        trainNumber: 'A102',
        date: 'Sunday, August 7, 2022',
        co2Emission: 'ONCF',
        offsetCost: '78 DH',
        transportType: 'car'
      },
      isSaved: true,
      isPaid: false
    },
    {
      id: '2',
      journeyDetails: {
        id: '18',
        departureTime: '14:30',
        arrivalTime: '16:45',
        duration: '2h 15m',
        departureStation: { name: 'Rabat Agdal', code: 'RBA' },
        arrivalStation: { name: 'Fes', code: 'FES' },
        price: 65,
        currency: 'DH',
        trainNumber: 'B205',
        date: 'Monday, August 8, 2022',
        co2Emission: 'CTM',
        offsetCost: '50 DH',
        transportType: 'train'
      },
      isSaved: true,
      isPaid: false
    },
    {
      id: '3',
      journeyDetails: {
        id: '19',
        departureTime: '08:45',
        arrivalTime: '11:30',
        duration: '2h 45m',
        departureStation: { name: 'Marrakech', code: 'RAK' },
        arrivalStation: { name: 'Casablanca', code: 'CAS' },
        price: 90,
        currency: 'DH',
        trainNumber: 'C307',
        date: 'Tuesday, July 19, 2022',
        co2Emission: 'ONCF',
        offsetCost: '85 DH',
        transportType: 'car'
      },
      isSaved: true,
      isPaid: true
    }
  ]);

  const navigateToTripDetails = (tripId: string) => {
    router.push(`/`);
  };

  const filteredTrips = trips.filter(trip => 
    activeTab === 'unpaid' ? !trip.isPaid : trip.isPaid
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} backgroundColor={colors.background} />
      
      <View style={[styles.header, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>My Trips</Text>
      </View>
      
      <View style={[styles.tabContainer, { backgroundColor: colors.card }]}>
        <TouchableOpacity 
          style={[
            styles.tabButton, 
            activeTab === 'unpaid' && [styles.activeTabButton, { borderBottomColor: colors.primary }]
          ]}
          onPress={() => setActiveTab('unpaid')}
        >
          <Text 
            style={[
              styles.tabText, 
              { color: activeTab === 'unpaid' ? colors.primary : colors.secondaryText }
            ]}
          >
            Unpaid
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.tabButton, 
            activeTab === 'paid' && [styles.activeTabButton, { borderBottomColor: colors.primary }]
          ]}
          onPress={() => setActiveTab('paid')}
        >
          <Text 
            style={[
              styles.tabText, 
              { color: activeTab === 'paid' ? colors.primary : colors.secondaryText }
            ]}
          >
            Paid
          </Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.content}>
        {filteredTrips.length > 0 ? (
          <View style={styles.tripList}>
            {filteredTrips.map((trip) => (
              <TouchableOpacity 
                key={trip.id}
                style={[styles.tripCard, { backgroundColor: colors.card }]}
                onPress={() => navigateToTripDetails(trip.id)}
              >
                <View style={[styles.tripCardHeader, { borderBottomColor: colors.border }]}>
                  <View style={styles.transportIcon}>
                    {trip.journeyDetails.transportType === 'car' ? (
                      <Car size={18} color={colors.primary} />
                    ) : (
                      <Train size={18} color={colors.primary} />
                    )}
                  </View>
                  <Text style={[styles.tripNumber, { color: colors.text }]}>Trip #{trip.journeyDetails.id}</Text>
                  <View style={styles.dateContainer}>
                    <Calendar size={14} color={colors.secondaryText} style={styles.dateIcon} />
                    <Text style={[styles.dateText, { color: colors.secondaryText }]}>{trip.journeyDetails.date}</Text>
                  </View>
                </View>
                
                <View style={styles.tripCardContent}>
                  <View style={styles.stationContainer}>
                    <View style={styles.timeContainer}>
                      <Text style={[styles.timeText, { color: colors.text }]}>{trip.journeyDetails.departureTime}</Text>
                      <View style={[styles.verticalLine, { backgroundColor: colors.border }]} />
                      <Text style={[styles.timeText, { color: colors.text }]}>{trip.journeyDetails.arrivalTime}</Text>
                    </View>
                    
                    <View style={styles.stationDetails}>
                      <Text style={[styles.stationName, { color: colors.text }]}>{trip.journeyDetails.departureStation.name}</Text>
                      <View style={styles.durationContainer}>
                        <Clock size={14} color={colors.secondaryText} style={styles.durationIcon} />
                        <Text style={[styles.durationText, { color: colors.secondaryText }]}>{trip.journeyDetails.duration}</Text>
                      </View>
                      <Text style={[styles.stationName, { color: colors.text }]}>{trip.journeyDetails.arrivalStation.name}</Text>
                    </View>
                  </View>
                  
                  <View style={[styles.tripMetrics, { borderTopColor: colors.border }]}>
                    <View style={styles.metricItem}>
                      <Text style={[styles.metricLabel, { color: colors.secondaryText }]}>Company</Text>
                      <Text style={[styles.metricValue, { color: colors.text }]}>{trip.journeyDetails.co2Emission}</Text>
                    </View>
                    
                    <View style={styles.metricItem}>
                      <Text style={[styles.metricLabel, { color: colors.secondaryText }]}>Price</Text>
                      <Text style={styles.offsetValue}>{trip.journeyDetails.offsetCost}</Text>
                    </View>
                  </View>
                </View>
                
                <View style={[styles.tripCardFooter, { borderTopColor: colors.border }]}>
                  <TouchableOpacity 
                    style={[
                      styles.payButton,
                      trip.isPaid ? styles.paidButton : null
                    ]}
                  >
                    <Text style={styles.payButtonText}>
                      {trip.isPaid ? 'Paid' : 'Pay Offset'}
                    </Text>
                    {!trip.isPaid && (
                      <ArrowRight size={16} color="white" style={styles.payArrow} />
                    )}
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <View style={styles.emptyState}>
            <Text style={[styles.emptyStateTitle, { color: colors.text }]}>
              No {activeTab === 'unpaid' ? 'unpaid' : 'paid'} trips yet
            </Text>
            <Text style={[styles.emptyStateMessage, { color: colors.secondaryText }]}>
              {activeTab === 'unpaid' 
                ? 'Plan a journey and track your carbon footprint'
                : 'Pay for your carbon offsets to see them here'}
            </Text>
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
  header: {
    paddingHorizontal: 16,
    paddingVertical: 40,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  tabButton: {
    paddingVertical: 12,
    marginRight: 24,
  },
  activeTabButton: {
    borderBottomWidth: 2,
  },
  tabText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  tripList: {
    marginBottom: 16,
  },
  tripCard: {
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  tripCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
  },
  transportIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(37, 99, 235, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  tripNumber: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateIcon: {
    marginRight: 4,
  },
  dateText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
  },
  tripCardContent: {
    padding: 16,
  },
  stationContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  timeContainer: {
    alignItems: 'center',
    marginRight: 16,
  },
  timeText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  verticalLine: {
    width: 1,
    height: 30,
    marginVertical: 6,
  },
  stationDetails: {
    flex: 1,
    justifyContent: 'space-between',
  },
  stationName: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  durationIcon: {
    marginRight: 4,
  },
  durationText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  tripMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    paddingTop: 16,
  },
  metricItem: {
    alignItems: 'center',
  },
  metricLabel: {
    fontSize: 14,
    marginBottom: 4,
    fontFamily: 'Inter-Regular',
  },
  metricValue: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  offsetValue: {
    fontSize: 16,
    color: '#FF4D4F',
    fontFamily: 'Inter-SemiBold',
  },
  tripCardFooter: {
    padding: 16,
    borderTopWidth: 1,
  },
  payButton: {
    backgroundColor: '#FF4D4F',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  paidButton: {
    backgroundColor: '#10B981',
  },
  payButtonText: {
    fontSize: 16,
    color: 'white',
    fontFamily: 'Inter-SemiBold',
  },
  payArrow: {
    marginLeft: 8,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 80,
    padding: 20,
  },
  emptyStateTitle: {
    fontSize: 18,
    marginBottom: 8,
    fontFamily: 'Inter-SemiBold',
  },
  emptyStateMessage: {
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'Inter-Regular',
  },
});