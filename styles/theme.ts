export const lightTheme = {
  background: '#f3f6fc',
  text: '#03040c',
  secondaryText: '#4d4e56',
  primary: '#3651c9',
  secondary: '#b192e2',
  accent: '#ab66d6',
  card: '#ffffff',
  border: '#e1e5f0',
  error: '#ef4444',
  success: '#10b981',
  warning: '#f59e0b',
  tabBar: {
    background: '#ffffff',
    active: '#3651c9',
    inactive: '#4d4e56',
  },
  header: {
    background: '#3651c9',
    text: '#f3f6fc',
  }
};

export const darkTheme = {
  background: '#03060c',
  text: '#f3f4fc',
  secondaryText: '#a6a7af',
  primary: '#3651c9',
  secondary: '#3c1d6d',
  accent: '#6e2999',
  card: '#0a0d14',
  border: '#1a1d24',
  error: '#ef4444',
  success: '#10b981',
  warning: '#f59e0b',
  tabBar: {
    background: '#0a0d14',
    active: '#3651c9',
    inactive: '#a6a7af',
  },
  header: {
    background: '#0a0d14',
    text: '#f3f4fc',
  }
};

export const createThemedStyles = (theme: typeof lightTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    text: {
      color: theme.text,
      fontFamily: 'Inter-Regular',
    },
    headerTitle: {
      fontSize: 20,
      fontFamily: 'Inter-Bold',
      color: theme.text,
    },
    card: {
      backgroundColor: theme.card,
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 2,
    },
  });