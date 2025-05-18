import { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

// Number of bars in the waveform
const BAR_COUNT = 10;

export function VoiceWaveform() {
  // Create animated values for each bar
  const animatedValues = useRef<Animated.Value[]>(
    Array(BAR_COUNT).fill(0).map(() => new Animated.Value(0.3))
  ).current;
  
  useEffect(() => {
    // Function to animate a single bar
    const animateBar = (index: number) => {
      // Random height for natural voice wave effect
      const randomHeight = 0.3 + Math.random() * 0.7;
      
      // Create the animation
      return Animated.sequence([
        Animated.timing(animatedValues[index], {
          toValue: randomHeight,
          duration: 300 + Math.random() * 200,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValues[index], {
          toValue: 0.3,
          duration: 300 + Math.random() * 200,
          useNativeDriver: true,
        }),
      ]);
    };
    
    // Function to start animation for all bars
    const startAnimation = () => {
      // Create animations for each bar with different timing
      const animations = animatedValues.map((_, index) => {
        // Stagger the animations
        return Animated.delay(index * 100, animateBar(index));
      });
      
      // Run the animations in parallel and loop
      Animated.loop(
        Animated.stagger(100, animations)
      ).start();
    };
    
    // Start the animation
    startAnimation();
    
    // Clean up animations on unmount
    return () => {
      animatedValues.forEach(value => {
        value.stopAnimation();
      });
    };
  }, []);
  
  return (
    <View style={styles.container}>
      {animatedValues.map((value, index) => (
        <Animated.View
          key={index}
          style={[
            styles.bar,
            {
              transform: [
                { scaleY: value },
                { translateY: Animated.multiply(value, new Animated.Value(-10)) },
              ],
            },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
  },
  bar: {
    width: 3,
    height: 20,
    backgroundColor: '#246BFD',
    borderRadius: 1.5,
    marginHorizontal: 3,
  },
});