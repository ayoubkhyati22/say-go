import { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ChevronRight, ChevronLeft } from 'lucide-react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { useTheme } from '../../context/ThemeContext';

type OnboardingSlide = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
};

const onboardingSlides: OnboardingSlide[] = [
  {
    id: 1,
    title: 'Find Your Perfect Ride',
    description: 'Book a ride from anywhere to anywhere with just a few taps.',
    imageUrl: 'https://images.pexels.com/photos/4071171/pexels-photo-4071171.jpeg',
  },
  {
    id: 2,
    title: 'Discover Amazing Hotels',
    description: 'Find the best hotels at the best prices worldwide.',
    imageUrl: 'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg',
  },
  {
    id: 3,
    title: 'All in One App',
    description: 'Your complete travel companion - transport, hotels, and more.',
    imageUrl: 'https://images.pexels.com/photos/7551617/pexels-photo-7551617.jpeg',
  },
];

export default function Onboarding() {
  const [activeSlide, setActiveSlide] = useState(0);
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { isDarkMode } = useTheme();

  const handleNext = () => {
    if (activeSlide < onboardingSlides.length - 1) {
      setActiveSlide(activeSlide + 1);
    } else {
      router.replace('/auth/login');
    }
  };

  const handlePrevious = () => {
    if (activeSlide > 0) {
      setActiveSlide(activeSlide - 1);
    }
  };

  const handleSkip = () => {
    router.replace('/auth/login');
  };

  const getButtonText = () => {
    return activeSlide === onboardingSlides.length - 1 ? 'Get Started' : 'Next';
  };

  const slide = onboardingSlides[activeSlide];

  const backgroundColor = isDarkMode ? styles.darkBackground : styles.lightBackground;
  const textColor = isDarkMode ? styles.darkText : styles.lightText;
  const buttonStyle = isDarkMode ? styles.darkButton : styles.lightButton;
  const iconColor = isDarkMode ? '#fff' : '#000';

  return (
    <View style={[styles.container, backgroundColor, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <View style={styles.skipContainer}>
        {activeSlide > 0 ? (
          <TouchableOpacity style={styles.navigationButton} onPress={handlePrevious}>
            <ChevronLeft size={24} color={iconColor} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
            <Text style={[styles.skipText, textColor]}>Skip</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: slide.imageUrl }} 
          style={styles.image} 
          resizeMode="cover" 
        />
      </View>

      <Animated.View 
        key={`slide-${slide.id}`}
        entering={FadeIn.duration(500)}
        exiting={FadeOut.duration(500)}
        style={styles.contentContainer}
      >
        <Text style={[styles.title, textColor]}>{slide.title}</Text>
        <Text style={[styles.description, textColor]}>{slide.description}</Text>
      </Animated.View>

      <View style={styles.indicatorContainer}>
        {onboardingSlides.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              index === activeSlide ? styles.activeIndicator : null,
              index === activeSlide && isDarkMode ? styles.darkActiveIndicator : null,
            ]}
          />
        ))}
      </View>

      <TouchableOpacity 
        style={[styles.nextButton, buttonStyle]} 
        onPress={handleNext}
      >
        <Text style={styles.nextButtonText}>{getButtonText()}</Text>
        <ChevronRight size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 24,
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
  skipContainer: {
    width: '100%',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  skipButton: {
    padding: 8,
  },
  skipText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
  },
  navigationButton: {
    padding: 8,
  },
  imageContainer: {
    width: '100%',
    height: 300,
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 40,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
    lineHeight: 24,
  },
  indicatorContainer: {
    flexDirection: 'row',
    marginBottom: 40,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 4,
  },
  activeIndicator: {
    width: 24,
    backgroundColor: '#3B82F6',
  },
  darkActiveIndicator: {
    backgroundColor: '#60A5FA',
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: 16,
    borderRadius: 12,
  },
  lightButton: {
    backgroundColor: '#3B82F6',
  },
  darkButton: {
    backgroundColor: '#2563EB',
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    marginRight: 8,
  },
});