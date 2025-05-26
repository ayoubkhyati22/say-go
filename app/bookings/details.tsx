import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft, CircleCheck as CheckCircle, Circle as XCircle, Clock, MapPin, Calendar, Info, CreditCard, Share, Car, Building2, PlaneTakeoff } from 'lucide-react-native';
import { useTheme } from '../../context/ThemeContext';
import { getBookingById } from '../../data/travelData';

export default function BookingDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { isDarkMode } = useTheme();
  
  const booking = getBookingById(id as string);

  if (!booking) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <Text style={styles.errorText}>Booking not found</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backLink}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const getStatusColor = () => {
    switch (booking.status) {
      case 'completed':
        return '#22C55E';
      case 'upcoming':
        return '#0EA5E9';
      case 'cancelled':
        return '#EF4444';
      default:
        return '#6B7280';
    }
  };

  const getStatusIcon = () => {
    switch (booking.status) {
      case 'completed':
        return <CheckCircle size={20} color="#22C55E" />;
      case 'upcoming':
        return <Clock size={20} color="#0EA5E9" />;
      case 'cancelled':
        return <XCircle size={20} color="#EF4444" />;
      default:
        return <Info size={20} color="#6B7280" />;
    }
  };

  const getBookingTypeIcon = () => {
    switch (booking.type) {
      case 'ride':
        return <Car size={24} color="#3B82F6" />;
      case 'hotel':
        return <Building2 size={24} color="#0EA5E9" />;
      case 'flight':
        return <PlaneTakeoff size={24} color="#F43F5E" />;
      default:
        return <Info size={24} color="#6B7280" />;
    }
  };

  const backgroundColor = isDarkMode ? styles.darkBackground : styles.lightBackground;
  const textColor = isDarkMode ? styles.darkText : styles.lightText;
  const cardBackground = isDarkMode ? styles.darkCardBackground : styles.lightCardBackground;

  return (
    <View style={[styles.container, backgroundColor, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color={isDarkMode ? '#F3F4F6' : '#111827'} />
        </TouchableOpacity>
        <Text style={[styles.screenTitle, textColor]}>Booking Details</Text>
        <TouchableOpacity style={styles.shareButton}>
          <Share size={24} color={isDarkMode ? '#F3F4F6' : '#111827'} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={[styles.bookingSummaryCard, cardBackground]}>
          <View style={styles.bookingHeader}>
            <View style={styles.bookingTypeIconContainer}>
              {getBookingTypeIcon()}
            </View>
            <View style={styles.bookingTitleContainer}>
              <Text style={[styles.bookingTitle, textColor]}>{booking.title}</Text>
              <View style={styles.bookingReferenceContainer}>
                <Text style={styles.bookingReferenceLabel}>Booking ID:</Text>
                <Text style={styles.bookingReference}>{booking.reference}</Text>
              </View>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.bookingStatusContainer}>
            <View style={styles.statusIconContainer}>
              {getStatusIcon()}
            </View>
            <View style={styles.statusTextContainer}>
              <Text style={[styles.statusLabel, textColor]}>Status</Text>
              <Text style={[styles.statusValue, { color: getStatusColor() }]}>
                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
              </Text>
            </View>
          </View>

          <View style={styles.bookingDetailsGrid}>
            <View style={styles.bookingDetailItem}>
              <Calendar size={16} color={isDarkMode ? '#9CA3AF' : '#6B7280'} />
              <View style={styles.bookingDetailTextContainer}>
                <Text style={[styles.bookingDetailLabel, textColor]}>Date</Text>
                <Text style={[styles.bookingDetailValue, textColor]}>{booking.date}</Text>
              </View>
            </View>

            {booking.time && (
              <View style={styles.bookingDetailItem}>
                <Clock size={16} color={isDarkMode ? '#9CA3AF' : '#6B7280'} />
                <View style={styles.bookingDetailTextContainer}>
                  <Text style={[styles.bookingDetailLabel, textColor]}>Time</Text>
                  <Text style={[styles.bookingDetailValue, textColor]}>{booking.time}</Text>
                </View>
              </View>
            )}

            {booking.location && (
              <View style={styles.bookingDetailItem}>
                <MapPin size={16} color={isDarkMode ? '#9CA3AF' : '#6B7280'} />
                <View style={styles.bookingDetailTextContainer}>
                  <Text style={[styles.bookingDetailLabel, textColor]}>Location</Text>
                  <Text style={[styles.bookingDetailValue, textColor]}>{booking.location}</Text>
                </View>
              </View>
            )}

            <View style={styles.bookingDetailItem}>
              <CreditCard size={16} color={isDarkMode ? '#9CA3AF' : '#6B7280'} />
              <View style={styles.bookingDetailTextContainer}>
                <Text style={[styles.bookingDetailLabel, textColor]}>Payment</Text>
                <Text style={[styles.bookingDetailValue, textColor]}>Credit Card</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={[styles.priceSummaryCard, cardBackground]}>
          <Text style={[styles.cardTitle, textColor]}>Price Details</Text>
          
          <View style={styles.priceRow}>
            <Text style={[styles.priceLabel, textColor]}>Base price</Text>
            <Text style={[styles.priceValue, textColor]}>
              ${(booking.price * 0.85).toFixed(2)}
            </Text>
          </View>
          
          <View style={styles.priceRow}>
            <Text style={[styles.priceLabel, textColor]}>Taxes & fees</Text>
            <Text style={[styles.priceValue, textColor]}>
              ${(booking.price * 0.15).toFixed(2)}
            </Text>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.totalRow}>
            <Text style={[styles.totalLabel, textColor]}>Total</Text>
            <Text style={[styles.totalValue, textColor]}>
              ${booking.price.toFixed(2)}
            </Text>
          </View>
        </View>

        {booking.status === 'upcoming' && (
          <View style={styles.actionButtonsContainer}>
            <TouchableOpacity style={styles.cancelButton}>
              <Text style={styles.cancelButtonText}>Cancel Booking</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.modifyButton}>
              <Text style={styles.modifyButtonText}>Modify</Text>
            </TouchableOpacity>
          </View>
        )}

        {booking.status === 'completed' && (
          <TouchableOpacity style={styles.reviewButton}>
            <Text style={styles.reviewButtonText}>Write a Review</Text>
          </TouchableOpacity>
        )}

        {booking.status === 'cancelled' && (
          <TouchableOpacity style={styles.rebookButton}>
            <Text style={styles.rebookButtonText}>Book Again</Text>
          </TouchableOpacity>
        )}

        <View style={styles.supportContainer}>
          <Text style={[styles.supportText, textColor]}>
            Need help with your booking?
          </Text>
          <TouchableOpacity>
            <Text style={styles.supportLink}>Contact Support</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  lightCardBackground: {
    backgroundColor: '#F9FAFB',
  },
  darkCardBackground: {
    backgroundColor: '#1E1E1E',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  screenTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
  },
  shareButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  bookingSummaryCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  bookingHeader: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  bookingTypeIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  bookingTitleContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  bookingTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 4,
  },
  bookingReferenceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bookingReferenceLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginRight: 4,
  },
  bookingReference: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#3B82F6',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 16,
  },
  bookingStatusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  statusIconContainer: {
    marginRight: 12,
  },
  statusTextContainer: {
    flex: 1,
  },
  statusLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    marginBottom: 2,
  },
  statusValue: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  bookingDetailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  bookingDetailItem: {
    flexDirection: 'row',
    width: '50%',
    marginBottom: 16,
  },
  bookingDetailTextContainer: {
    marginLeft: 8,
  },
  bookingDetailLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    marginBottom: 2,
  },
  bookingDetailValue: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  priceSummaryCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  cardTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 16,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  priceLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  priceValue: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalLabel: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  totalValue: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  cancelButton: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#EF4444',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  cancelButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#EF4444',
  },
  modifyButton: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  modifyButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  reviewButton: {
    height: 48,
    borderRadius: 12,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  reviewButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  rebookButton: {
    height: 48,
    borderRadius: 12,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  rebookButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  supportContainer: {
    alignItems: 'center',
  },
  supportText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    marginBottom: 4,
  },
  supportLink: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#3B82F6',
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