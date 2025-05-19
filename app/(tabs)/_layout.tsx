import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { Tabs } from 'expo-router';
import { Home, Search as SearchIcon, Plus, Calendar, User, Telescope } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';

export default function TabLayout() {
  const { colors, isDarkMode } = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: [
          styles.tabBar,
          { 
            backgroundColor: colors.tabBar.background,
            borderTopColor: colors.border 
          }
        ],
        tabBarShowLabel: true,
        tabBarActiveTintColor: colors.tabBar.active,
        tabBarInactiveTintColor: colors.tabBar.inactive,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Home color={color} size={24} />,
          tabBarLabelStyle: styles.tabBarLabel,
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color }) => <SearchIcon color={color} size={24} />,
          tabBarLabelStyle: styles.tabBarLabel,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <Telescope color={color} size={24} />,
          tabBarLabelStyle: styles.tabBarLabel,
        }}
      />

      <Tabs.Screen
        name="bookings"
        options={{
          title: 'Bookings',
          tabBarIcon: ({ color }) => <Calendar color={color} size={24} />,
          tabBarLabelStyle: styles.tabBarLabel,
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <User color={color} size={24} />,
          tabBarLabelStyle: styles.tabBarLabel,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 70,
    borderTopWidth: 1,
  },
  tabBarLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    marginBottom: 5,
  },
});