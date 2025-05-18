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
import { JourneyCard } from '../../components/JourneyCard';
import { Calendar, ArrowRight, Clock, Car, Train } from 'lucide-react-native';
import { useRouter } from 'expo-router';

// Types from your existing components
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
  const [activeTab, setActiveTab] = useState('unpaid'); // 'unpaid' or 'paid'
  
  // Sample trips data
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
        co2Emission: '3.67',
        offsetCost: '$7.8',
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
        co2Emission: '2.92',
        offsetCost: '$5.0',
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
        co2Emission: '4.15',
        offsetCost: '$8.5',
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
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Trips</Text>
      </View>
      
      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[
            styles.tabButton, 
            activeTab === 'unpaid' ? styles.activeTabButton : null
          ]}
          onPress={() => setActiveTab('unpaid')}
        >
          <Text 
            style={[
              styles.tabText, 
              activeTab === 'unpaid' ? styles.activeTabText : null
            ]}
          >
            Unpaid
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.tabButton, 
            activeTab === 'paid' ? styles.activeTabButton : null
          ]}
          onPress={() => setActiveTab('paid')}
        >
          <Text 
            style={[
              styles.tabText, 
              activeTab === 'paid' ? styles.activeTabText : null
            ]}
          >
            Paid
          </Text>
        </TouchableOpacity>
      </View>
      
      {/* Trip List */}
      <ScrollView style={styles.content}>
        {filteredTrips.length > 0 ? (
          <View style={styles.tripList}>
            {filteredTrips.map((trip) => (
              <TouchableOpacity 
                key={trip.id}
                style={styles.tripCard}
                onPress={() => navigateToTripDetails(trip.id)}
              >
                {/* Trip Card Header */}
                <View style={styles.tripCardHeader}>
                  <View style={styles.transportIcon}>
                    {trip.journeyDetails.transportType === 'car' ? (
                      <Car size={18} color="#246BFD" />
                    ) : (
                      <Train size={18} color="#246BFD" />
                    )}
                  </View>
                  <Text style={styles.tripNumber}>Trip #{trip.journeyDetails.id}</Text>
                  <View style={styles.dateContainer}>
                    <Calendar size={14} color="#6B7280" style={styles.dateIcon} />
                    <Text style={styles.dateText}>{trip.journeyDetails.date}</Text>
                  </View>
                </View>
                
                {/* Trip Card Content */}
                <View style={styles.tripCardContent}>
                  <View style={styles.stationContainer}>
                    <View style={styles.timeContainer}>
                      <Text style={styles.timeText}>{trip.journeyDetails.departureTime}</Text>
                      <View style={styles.verticalLine} />
                      <Text style={styles.timeText}>{trip.journeyDetails.arrivalTime}</Text>
                    </View>
                    
                    <View style={styles.stationDetails}>
                      <Text style={styles.stationName}>{trip.journeyDetails.departureStation.name}</Text>
                      <View style={styles.durationContainer}>
                        <Clock size={14} color="#6B7280" style={styles.durationIcon} />
                        <Text style={styles.durationText}>{trip.journeyDetails.duration}</Text>
                      </View>
                      <Text style={styles.stationName}>{trip.journeyDetails.arrivalStation.name}</Text>
                    </View>
                  </View>
                  
                  <View style={styles.tripMetrics}>
                    <View style={styles.metricItem}>
                      <Text style={styles.metricLabel}>CO2</Text>
                      <Text style={styles.metricValue}>{trip.journeyDetails.co2Emission} g</Text>
                    </View>
                    
                    <View style={styles.metricItem}>
                      <Text style={styles.metricLabel}>Offset</Text>
                      <Text style={styles.offsetValue}>{trip.journeyDetails.offsetCost}</Text>
                    </View>
                  </View>
                </View>
                
                {/* Trip Card Footer */}
                <View style={styles.tripCardFooter}>
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
            <Text style={styles.emptyStateTitle}>
              No {activeTab === 'unpaid' ? 'unpaid' : 'paid'} trips yet
            </Text>
            <Text style={styles.emptyStateMessage}>
              {activeTab === 'unpaid' 
                ? 'Plan a journey and track your carbon footprint'
                : 'Pay for your carbon offsets to see them here'}
            </Text>
          </View>
        )}
        
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
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
    fontFamily: 'Inter-Bold',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingHorizontal: 16,
  },
  tabButton: {
    paddingVertical: 12,
    marginRight: 24,
  },
  activeTabButton: {
    borderBottomWidth: 2,
    borderBottomColor: '#246BFD',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6B7280',
    fontFamily: 'Inter-Medium',
  },
  activeTabText: {
    color: '#246BFD',
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  tripList: {
    marginBottom: 16,
  },
  tripCard: {
    backgroundColor: 'white',
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
    borderBottomColor: '#E5E7EB',
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
    fontWeight: '600',
    color: '#1A1A1A',
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
    color: '#6B7280',
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
    fontWeight: '600',
    color: '#1A1A1A',
    fontFamily: 'Inter-SemiBold',
  },
  verticalLine: {
    width: 1,
    height: 30,
    backgroundColor: '#D1D5DB',
    marginVertical: 6,
  },
  stationDetails: {
    flex: 1,
    justifyContent: 'space-between',
  },
  stationName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1A1A1A',
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
    color: '#6B7280',
    fontFamily: 'Inter-Regular',
  },
  tripMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 16,
  },
  metricItem: {
    alignItems: 'center',
  },
  metricLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
    fontFamily: 'Inter-Regular',
  },
  metricValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    fontFamily: 'Inter-SemiBold',
  },
  offsetValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF4D4F',
    fontFamily: 'Inter-SemiBold',
  },
  tripCardFooter: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
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
    fontWeight: '600',
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
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 8,
    fontFamily: 'Inter-SemiBold',
  },
  emptyStateMessage: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    fontFamily: 'Inter-Regular',
  },
});