import { StyleSheet } from 'react-native';

export const lightTheme = {
  background: '#FFFFFF',
  text: '#111827',
  secondaryText: '#6B7280',
  primary: '#246BFD',
  secondary: '#3B82F6',
  card: '#F9FAFB',
  border: '#E5E7EB',
  error: '#EF4444',
  success: '#10B981',
  warning: '#F59E0B',
};

export const darkTheme = {
  background: '#121212',
  text: '#F3F4F6',
  secondaryText: '#9CA3AF',
  primary: '#2563EB',
  secondary: '#60A5FA',
  card: '#1E1E1E',
  border: '#374151',
  error: '#EF4444',
  success: '#10B981',
  warning: '#F59E0B',
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