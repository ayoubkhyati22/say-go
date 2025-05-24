import React from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { 
  useAnimatedStyle, 
  withRepeat, 
  withSequence, 
  withTiming,
  useSharedValue,
  withDelay
} from 'react-native-reanimated';

export function VoiceWaveform() {
  const bars = Array(5).fill(0);
  const barAnimations = bars.map(() => useSharedValue(1));

  React.useEffect(() => {
    bars.forEach((_, index) => {
      barAnimations[index].value = withRepeat(
        withDelay(
          index * 100,
          withSequence(
            withTiming(2, { duration: 500 }),
            withTiming(1, { duration: 500 })
          )
        ),
        -1,
        true
      );
    });
  }, []);

  return (
    <View style={styles.container}>
      {bars.map((_, index) => {
        const animatedStyle = useAnimatedStyle(() => ({
          transform: [{ scaleY: barAnimations[index].value }],
        }));

        return (
          <Animated.View
            key={index}
            style={[styles.bar, animatedStyle]}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    gap: 4,
  },
  bar: {
    width: 3,
    height: 20,
    backgroundColor: '#007AFF',
    borderRadius: 2,
  },
});