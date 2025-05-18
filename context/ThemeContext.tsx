import { createContext, useContext, useEffect, useState } from 'react';
import { useColorScheme, AppState, AppStateStatus, Appearance } from 'react-native';
import Animated, { withTiming, useAnimatedStyle, interpolateColor } from 'react-native-reanimated';
import { lightTheme, darkTheme } from '@/styles/theme';

type ThemeType = 'light' | 'dark' | 'system';

type ThemeContextType = {
  theme: ThemeType;
  isDarkMode: boolean;
  setTheme: (theme: ThemeType) => void;
  animatedColor: (lightColor: string, darkColor: string) => any;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemColorScheme = useColorScheme();
  const [theme, setTheme] = useState<ThemeType>('system');
  const [progress] = useState(new Animated.SharedValue(systemColorScheme === 'dark' ? 1 : 0));

  const isDarkMode = 
    theme === 'system' 
      ? systemColorScheme === 'dark'
      : theme === 'dark';

  useEffect(() => {
    progress.value = withTiming(isDarkMode ? 1 : 0, {
      duration: 300,
    });
  }, [isDarkMode]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState: AppStateStatus) => {
      if (nextAppState === 'active' && theme === 'system') {
        const colorScheme = Appearance.getColorScheme();
        progress.value = withTiming(colorScheme === 'dark' ? 1 : 0, {
          duration: 300,
        });
      }
    });

    return () => {
      subscription.remove();
    };
  }, [theme]);

  const animatedColor = (lightColor: string, darkColor: string) => {
    return useAnimatedStyle(() => ({
      color: interpolateColor(
        progress.value,
        [0, 1],
        [lightColor, darkColor]
      ),
    }));
  };

  return (
    <ThemeContext.Provider value={{ theme, isDarkMode, setTheme, animatedColor }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}