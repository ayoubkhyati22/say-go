import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useState, useRef, useMemo } from 'react';
import { BookmarkCheck, Bookmark, Clock, TrainFront, BusFront } from 'lucide-react-native';
import { JourneyDetails } from '@/types';
import { useTheme } from '@/context/ThemeContext';
import Animated, { 
  useAnimatedStyle, 
  withTiming, 
  useSharedValue, 
  interpolateColor 
} from 'react-native-reanimated';

interface JourneyCardProps {
  journey: JourneyDetails;
  index: number;
  isSaved: boolean;
  onToggleSave: () => void;
}

export function JourneyCard({ journey, isSaved, onToggleSave }: JourneyCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const expandAnimation = useSharedValue(0);
  const { colors, isDarkMode, animatedColor } = useTheme();
  
  const images = useMemo(() => {
    return {
      royaumeMaroc: {
        light: require('../assets/images/royaume-maroc.svg'),
        dark: require('../assets/images/royaume-maroc.svg')
      },
      oncf: {
        light: require('../assets/images/oncf.svg'),
        dark: require('../assets/images/oncf-dark.svg')
      },
      ctm: {
        light: require('../assets/images/ctm.svg'),
        dark: require('../assets/images/ctm-dark.svg')
      },
      booking: {
        light: require('../assets/images/booking.svg'),
        dark: require('../assets/images/booking-dark.svg')
      },
      airbnb: {
        light: require('../assets/images/airbnb.svg'),
        dark: require('../assets/images/airbnb-dark.svg')
      }
    };
  }, []);


  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    expandAnimation.value = withTiming(isExpanded ? 0 : 1, {
      duration: 300,
    });
  };

  const animatedHeight = useAnimatedStyle(() => {
    return {
      maxHeight: isExpanded ? withTiming(230) : withTiming(120),
    };
  });

  const formatCurrency = (price: number, currency: string) => {
    return `${price} ${currency}`;
  };

  // Determine logo based on gender property
  const logoSource = journey.gender === 'ctm'
    ? require('../assets/images/ctm.svg')
    : require('../assets/images/oncf.svg');

  // Create animated styles for themed colors
  const cardStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        isDarkMode ? 1 : 0,
        [0, 1],
        [colors.card, colors.card]
      ),
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
      overflow: 'hidden',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: isDarkMode ? 0.2 : 0.05,
      shadowRadius: 8,
      elevation: 2,
      position: 'relative',
    };
  });

  const timeTextStyle = useAnimatedStyle(() => {
    return {
      fontFamily: 'Inter-SemiBold',
      fontSize: 16,
      color: interpolateColor(
        isDarkMode ? 1 : 0,
        [0, 1],
        [colors.primary, colors.primary]
      ),
    };
  });

  const stationNameStyle = useAnimatedStyle(() => {
    return {
      fontFamily: 'Inter-Medium',
      fontSize: 14,
      color: interpolateColor(
        isDarkMode ? 1 : 0,
        [0, 1],
        [colors.text, colors.text]
      ),
      textTransform: 'capitalize',
    };
  });

  const travelTimeStyle = useAnimatedStyle(() => {
    return {
      fontFamily: 'Inter-Regular',
      fontSize: 13,
      color: interpolateColor(
        isDarkMode ? 1 : 0,
        [0, 1],
        [colors.secondaryText, colors.secondaryText]
      ),
    };
  });

  const priceCircleStyle = useAnimatedStyle(() => {
    return {
      borderRadius: 24,
      paddingVertical: 6,
      paddingHorizontal: 8,
      backgroundColor: interpolateColor(
        isDarkMode ? 1 : 0,
        [0, 1],
        ['#f6f3fd', isDarkMode ? colors.secondary : '#f6f3fd']
      ),
      justifyContent: 'center',
      alignItems: 'center',
      minWidth: 80,
    };
  });

  const priceTextStyle = useAnimatedStyle(() => {
    return {
      fontFamily: 'Inter-Bold',
      fontSize: 16,
      color: interpolateColor(
        isDarkMode ? 1 : 0,
        [0, 1],
        [colors.primary, colors.text]
      ),
      textAlign: 'center',
    };
  });

  const separatorStyle = useAnimatedStyle(() => {
    return {
      height: 1,
      backgroundColor: interpolateColor(
        isDarkMode ? 1 : 0,
        [0, 1],
        [colors.border, colors.border]
      ),
      marginBottom: 16,
    };
  });

  const detailTextStyle = useAnimatedStyle(() => {
    return {
      fontFamily: 'Inter-Medium',
      fontSize: 14,
      color: interpolateColor(
        isDarkMode ? 1 : 0,
        [0, 1],
        [colors.primary, colors.primary]
      ),
      marginLeft: 8,
    };
  });

  const detailTimeTextStyle = useAnimatedStyle(() => {
    return {
      fontFamily: 'Inter-SemiBold',
      fontSize: 14,
      color: interpolateColor(
        isDarkMode ? 1 : 0,
        [0, 1],
        [colors.text, colors.text]
      ),
    };
  });

  const detailStationTextStyle = useAnimatedStyle(() => {
    return {
      fontFamily: 'Inter-Medium',
      fontSize: 14,
      color: interpolateColor(
        isDarkMode ? 1 : 0,
        [0, 1],
        [colors.secondaryText, colors.secondaryText]
      ),
      textTransform: 'capitalize',
    };
  });

  return (
    <Animated.View style={[cardStyle, animatedHeight]}>
      <TouchableOpacity
        style={styles.cardHeader}
        onPress={toggleExpand}
        activeOpacity={0.8}
      >
        <View style={styles.headerLeft}>
          <View style={styles.timeContainer}>
            <Animated.Text style={timeTextStyle}>{journey.departureTime}</Animated.Text>
            <View style={styles.timelineContainer}>
              <View style={[styles.timelineDot, { backgroundColor: colors.accent }]} />
              <View style={styles.timelineLine}>
                <View style={[styles.dot, { backgroundColor: colors.primary }]} />
                <View style={[styles.dot, { backgroundColor: colors.primary }]} />
                <View style={[styles.dot, { backgroundColor: colors.primary }]} />
                <View style={[styles.dot, { backgroundColor: colors.primary }]} />
              </View>
              <View style={[styles.timelineDot, { backgroundColor: colors.accent }]} />
            </View>
            <Animated.Text style={timeTextStyle}>{journey.arrivalTime}</Animated.Text>
          </View>
        </View>

        <View style={styles.headerRight}>
          <View style={styles.stationContainer}>
            <Animated.Text style={stationNameStyle}>{journey.departureStation.name}</Animated.Text>
            <Animated.Text style={travelTimeStyle}>{journey.duration}</Animated.Text>
            <Animated.Text style={stationNameStyle}>{journey.arrivalStation.name}</Animated.Text>
          </View>
        </View>

        {journey.gender === 'ctm' ? (
        <Image source={isDarkMode ? images.ctm.dark : images.ctm.light} />
        ) : (
          <Image source={isDarkMode ? images.oncf.dark : images.oncf.light} />
          )}

        <TouchableOpacity
          style={styles.saveButton}
          onPress={onToggleSave}
        >
          {isSaved ? (
            <BookmarkCheck size={20} color={colors.accent} />
          ) : (
            <Bookmark size={20} color={colors.secondaryText} />
          )}
        </TouchableOpacity>
      </TouchableOpacity>

      {/* Price in circle container */}
      <View style={styles.priceCircleContainer}>
        <Animated.View style={priceCircleStyle}>
          <Animated.Text style={priceTextStyle}>
            {formatCurrency(journey.price, journey.currency)}
          </Animated.Text>
        </Animated.View>
      </View>

      {/* Additional details section that expands */}
      <View style={styles.expandedDetailsContainer}>
        <Animated.View style={separatorStyle} />

        <View style={styles.detailRow}>
          <View style={styles.detailItem}>
            {journey.gender === 'oncf' ? (
              <TrainFront size={16} color={colors.accent} />
            ) : (
              <BusFront size={16} color={colors.accent} />
            )}
            <Animated.Text style={detailTextStyle}>
              {journey.gender === 'oncf' ? `Train ${journey.trainNumber}` : `Bus ${journey.trainNumber}`}
            </Animated.Text>
          </View>

          <View style={styles.detailItem}>
            <Clock size={16} color={colors.accent} />
            <Animated.Text style={detailTextStyle}>{journey.duration}</Animated.Text>
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
                <View style={[styles.stationDot, { backgroundColor: colors.primary }]} />
                <View style={styles.stationInfo}>
                  <Animated.Text style={detailTimeTextStyle}>{journey.departureTime}</Animated.Text>
                  <Animated.Text style={detailStationTextStyle}>{journey.departureStation.name}</Animated.Text>
                </View>
              </View>
              <View style={styles.stationDetail}>
                <View style={[styles.stationDot, { backgroundColor: colors.primary }]} />
                <View style={styles.stationInfo}>
                  <Animated.Text style={detailTimeTextStyle}>{journey.arrivalTime}</Animated.Text>
                  <Animated.Text style={detailStationTextStyle}>{journey.arrivalStation.name}</Animated.Text>
                </View>
              </View>
              <View style={styles.stationDetail}>
                <View style={[styles.stationDot, { backgroundColor: colors.primary }]} />
                <View style={styles.stationInfo}>
                  <Animated.Text style={detailTimeTextStyle}>{journey.arrivalTime}</Animated.Text>
                  <Animated.Text style={detailStationTextStyle}>{journey.arrivalStation.name}</Animated.Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerLeft: {
    width: 50,
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
  },
  stationContainer: {
    flex: 1,
    marginLeft: 18,
    justifyContent: 'space-between',
  },
  priceCircleContainer: {
    position: 'absolute',
    top: 70,
    right: 16,
    zIndex: 10,
  },
  saveButton: {
    padding: 4,
    marginTop: 0,
  },
  expandedDetailsContainer: {
    marginTop: 16,
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
  stationDetailScrollView: {
    marginBottom: 12,
  },
  stationDetailRow: {
    flexDirection: 'row',
    paddingRight: 20,
  },
  stationDetail: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginRight: 20,
    minWidth: 150,
  },
  stationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  stationLine: {
    width: 1,
    marginLeft: 4.5,
    marginVertical: 4,
  },
  stationInfo: {
    marginLeft: 12,
  },
});