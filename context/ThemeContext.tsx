import { createContext, useContext, useEffect, useState } from 'react';
import { useColorScheme, AppState, AppStateStatus } from 'react-native';

type ThemeType = 'light' | 'dark' | 'system';

type ThemeContextType = {
  theme: ThemeType;
  isDarkMode: boolean;
  setTheme: (theme: ThemeType) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemColorScheme = useColorScheme();
  const [theme, setTheme] = useState<ThemeType>('system');

  // Calculate if we're in dark mode based on theme settings and system preference
  const isDarkMode = 
    theme === 'system' 
      ? systemColorScheme === 'dark'
      : theme === 'dark';

  // Handle app state changes to update theme when app comes to foreground
  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState: AppStateStatus) => {
      if (nextAppState === 'active' && theme === 'system') {
        // Force re-render when app becomes active to check for system theme changes
      }
    });

    return () => {
      subscription.remove();
    };
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, isDarkMode, setTheme }}>
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