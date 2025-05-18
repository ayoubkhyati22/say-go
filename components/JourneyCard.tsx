import { StyleSheet, View, Text, TouchableOpacity, Animated, Image, ScrollView } from 'react-native';
import { useState, useRef } from 'react';
import { BookmarkCheck, Bookmark, Clock, TrainFront, BusFront } from 'lucide-react-native';
import { JourneyDetails } from '@/types';


interface JourneyCardProps {
  journey: JourneyDetails;
  index: number;
  isSaved: boolean;
  onToggleSave: () => void;
}

export function JourneyCard({ journey, isSaved, onToggleSave }: JourneyCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    Animated.timing(animation, {
      toValue: isExpanded ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const maxHeight = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [120, 230],
  });

  const formatCurrency = (price: number, currency: string) => {
    return `${price} ${currency}`;
  };

  // Determine logo and transport icon based on gender property
  const logoSource = journey.gender === 'ctm'
    ? require('../assets/images/ctm.svg')
    : require('../assets/images/oncf.svg');

  return (
    <Animated.View style={[styles.card, { maxHeight }]}>
      <TouchableOpacity
        style={styles.cardHeader}
        onPress={toggleExpand}
        activeOpacity={0.8}
      >
        <View style={styles.headerLeft}>
          <View style={styles.timeContainer}>
            <Text style={styles.departureTime}>{journey.departureTime}</Text>
            <View style={styles.timelineContainer}>
              <View style={styles.timelineDot} />
              <View style={styles.timelineLine}>
                <View style={styles.dot} />
                <View style={styles.dot} />
                <View style={styles.dot} />
                <View style={styles.dot} />
              </View>
              <View style={styles.timelineDot} />
            </View>
            <Text style={styles.arrivalTime}>{journey.arrivalTime}</Text>
          </View>
        </View>

        <View style={styles.headerRight}>
          <View style={styles.stationContainer}>
            <Text style={styles.stationName}>{journey.departureStation.name}</Text>
            <Text style={styles.travelTime}>{journey.duration}</Text>
            <Text style={styles.stationName}>{journey.arrivalStation.name}</Text>
          </View>
        </View>

        {journey.gender === 'ctm' ? (
          <Image source={require('../assets/images/ctm.svg')} />
        ) : (
          <Image source={require('../assets/images/oncf.svg')} />
        )}

        <TouchableOpacity
          style={styles.saveButton}
          onPress={onToggleSave}
        >
          {isSaved ? (
            <BookmarkCheck size={20} color="#39E6B6" />
          ) : (
            <Bookmark size={20} color="#9CA3AF" />
          )}
        </TouchableOpacity>
      </TouchableOpacity>

      {/* Price in red circle container */}
      <View style={styles.priceCircleContainer}>
        <View style={styles.priceCircle}>
          <Text style={styles.price}>
            {formatCurrency(journey.price, journey.currency)}
          </Text>
        </View>
      </View>

      {/* Additional details section that expands */}
      <View style={styles.expandedDetailsContainer}>
        <View style={styles.separator} />

        <View style={styles.detailRow}>
          <View style={styles.detailItem}>
            {journey.gender === 'oncf' ? (
              <TrainFront size={16} color="#39E6B6" />
            ) : (
              <BusFront size={16} color="#39E6B6" />
            )}
            {journey.gender === 'oncf' ? (
              <Text style={styles.detailText}>Train {journey.trainNumber}</Text>
            ) : (
              <Text style={styles.detailText}>Bus {journey.trainNumber}</Text>
            )}
          </View>

          <View style={styles.detailItem}>
            <Clock size={16} color="#39E6B6" />
            <Text style={styles.detailText}>{journey.duration}</Text>
          </View>
        </View>

        <View style={styles.stationDetailRow}>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={styles.stationDetailScrollView}
          >
            <View style={styles.stationDetailRow}>
              <View style={styles.stationDetail}>
                <View style={styles.stationDot} />
                <View style={styles.stationInfo}>
                  <Text style={styles.detailTimeText}>{journey.departureTime}</Text>
                  <Text style={styles.detailStationText}>{journey.departureStation.name}</Text>
                </View>
              </View>
              <View style={styles.stationDetail}>
                <View style={styles.stationDot} />
                <View style={styles.stationInfo}>
                  <Text style={styles.detailTimeText}>{journey.arrivalTime}</Text>
                  <Text style={styles.detailStationText}>{journey.arrivalStation.name}</Text>
                </View>
              </View>
              <View style={styles.stationDetail}>
                <View style={styles.stationDot} />
                <View style={styles.stationInfo}>
                  <Text style={styles.detailTimeText}>{journey.arrivalTime}</Text>
                  <Text style={styles.detailStationText}>{journey.arrivalStation.name}</Text>
                </View>
              </View>
              {/* You can add more stations here if needed */}
            </View>
          </ScrollView>
        </View>

        {/* Book button without price */}
        {/* <TouchableOpacity style={styles.bookButton}>
          <Text style={styles.bookButtonText}>Book This Journey</Text>
        </TouchableOpacity> */}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    position: 'relative', // Added for absolute positioning of price circle
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerLeft: {
    width: 45,
  },
  headerRight: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rightSection: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  timeContainer: {
    alignItems: 'center',
  },
  departureTime: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#4a20aa',
  },
  arrivalTime: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#4a20aa',
  },
  timelineContainer: {
    height: 40,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 4,
  },
  timelineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#39E6B6',
  },
  timelineLine: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 30,
  },

  dot: {
    width: 1,
    height: 4,
    backgroundColor: '#4a20aa',
  },

  stationContainer: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  stationName: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#1A1A1A',
    textTransform: 'capitalize',
  },
  travelTime: {
    fontFamily: 'Inter-Regular',
    fontSize: 13,
    color: '#6B7280',
  },
  priceCircleContainer: {
    position: 'absolute',
    top: 70, // Position to match the red circle in the image
    right: 16,
    zIndex: 10,
  },
  priceCircle: {
    borderRadius: 24,
    paddingVertical: 6,
    paddingHorizontal: 8,
    backgroundColor: '#f6f3fd',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 80, // Ensure there's enough width for larger prices
  },
  price: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#4a20aa', // Keeping the purple color for price
    textAlign: 'center',
  },
  saveButton: {
    padding: 4,
    marginTop: 0,
  },
  expandedDetailsContainer: {
    marginTop: 16,
  },
  separator: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  detailText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#4a20aa',
    marginLeft: 8,
  },
  stationDetailScrollView: {
    marginBottom: 12,
  },
  stationDetailRow: {
    flexDirection: 'row',
    paddingRight: 20, // Add some padding at the end for better scrolling experience
  },
  stationDetail: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginRight: 20, // Add space between stations
    minWidth: 150, // Ensure minimum width for each station detail
  },
  stationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#4a20aa',
    marginTop: 5,
  },
  stationLine: {
    width: 1,
    backgroundColor: '#D1D5DB',
    marginLeft: 4.5,
    marginVertical: 4,
  },
  stationInfo: {
    marginLeft: 12,
  },
  detailTimeText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#1A1A1A',
  },
  detailStationText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: 'gray',
    textTransform: 'capitalize',
  },
  stationCodeText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
  },
  bookButton: {
    backgroundColor: '#246BFD',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  bookButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: 'white',
  },
});