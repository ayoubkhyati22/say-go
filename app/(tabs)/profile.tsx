import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity,
  StatusBar,
  Platform,
} from 'react-native';
import { Settings, CreditCard, ChevronRight, Bell, Shield, CircleHelp as HelpCircle, LogOut, MapPin, User as UserIcon, Leaf, Moon, Sun, Monitor } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import Animated from 'react-native-reanimated';

export default function ProfileScreen() {
  const { theme, setTheme, isDarkMode } = useTheme();
  
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    profileImage: null,
    totalSaved: '32.4 kg',
    savedTrips: 12
  };

  const themeOptions = [
    { id: 'light', title: 'Light', icon: Sun },
    { id: 'dark', title: 'Dark', icon: Moon },
    { id: 'system', title: 'System', icon: Monitor },
  ] as const;

  const menuItems = [
    {
      id: 'account',
      title: 'Account Settings',
      icon: <UserIcon size={20} color={isDarkMode ? '#60A5FA' : '#246BFD'} />,
      rightContent: null,
    },
    {
      id: 'payment',
      title: 'Payment Methods',
      icon: <CreditCard size={20} color={isDarkMode ? '#60A5FA' : '#246BFD'} />,
      rightContent: <Text style={styles.itemInfo}>Mastercard •••• 4778</Text>,
    },
    {
      id: 'notifications',
      title: 'Notifications',
      icon: <Bell size={20} color={isDarkMode ? '#60A5FA' : '#246BFD'} />,
      rightContent: null,
    },
    {
      id: 'location',
      title: 'Location',
      icon: <MapPin size={20} color={isDarkMode ? '#60A5FA' : '#246BFD'} />,
      rightContent: <Text style={styles.itemInfo}>Casablanca</Text>,
    },
    {
      id: 'security',
      title: 'Security',
      icon: <Shield size={20} color={isDarkMode ? '#60A5FA' : '#246BFD'} />,
      rightContent: null,
    },
    {
      id: 'help',
      title: 'Help & Support',
      icon: <HelpCircle size={20} color={isDarkMode ? '#60A5FA' : '#246BFD'} />,
      rightContent: null,
    },
    {
      id: 'logout',
      title: 'Logout',
      icon: <LogOut size={20} color="#FF4D4F" />,
      rightContent: null,
      danger: true,
    },
  ];

  return (
    <SafeAreaView style={[styles.container, isDarkMode ? styles.darkBackground : styles.lightBackground]}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
      
      <View style={styles.header}>
        <Text style={[styles.headerTitle, isDarkMode ? styles.darkText : styles.lightText]}>Profile</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Settings size={24} color={isDarkMode ? '#F3F4F6' : '#1A1A1A'} />
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.content}>
        <View style={[styles.profileSection, isDarkMode ? styles.darkCard : styles.lightCard]}>
          <View style={styles.profileInfo}>
            <View style={styles.profileImagePlaceholder}>
              <Text style={styles.profileInitials}>
                {user.name.split(' ').map(n => n[0]).join('')}
              </Text>
            </View>
            <View style={styles.profileDetails}>
              <Text style={[styles.profileName, isDarkMode ? styles.darkText : styles.lightText]}>
                {user.name}
              </Text>
              <Text style={styles.profileEmail}>{user.email}</Text>
            </View>
          </View>
          
          <TouchableOpacity style={styles.editProfileButton}>
            <Text style={styles.editProfileText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Theme Selection */}
        <View style={[styles.themeSection, isDarkMode ? styles.darkCard : styles.lightCard]}>
          <Text style={[styles.themeSectionTitle, isDarkMode ? styles.darkText : styles.lightText]}>
            Appearance
          </Text>
          <View style={styles.themeOptions}>
            {themeOptions.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.themeOption,
                  theme === option.id && styles.themeOptionActive,
                  isDarkMode && styles.darkThemeOption
                ]}
                onPress={() => setTheme(option.id)}
              >
                <option.icon
                  size={20}
                  color={theme === option.id ? (isDarkMode ? '#60A5FA' : '#246BFD') : (isDarkMode ? '#9CA3AF' : '#6B7280')}
                />
                <Text
                  style={[
                    styles.themeOptionText,
                    theme === option.id && styles.themeOptionTextActive,
                    isDarkMode && styles.darkThemeOptionText
                  ]}
                >
                  {option.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        <View style={[styles.statsCard, isDarkMode ? styles.darkCard : styles.lightCard]}>
          <View style={styles.statsHeader}>
            <Leaf size={20} color="#10B981" />
            <Text style={[styles.statsTitle, isDarkMode ? styles.darkText : styles.lightText]}>
              Your CO2 Impact
            </Text>
          </View>
          
          <View style={styles.statsContent}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{user.totalSaved}</Text>
              <Text style={styles.statLabel}>CO2 Saved</Text>
            </View>
            
            <View style={styles.statsDivider} />
            
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{user.savedTrips}</Text>
              <Text style={styles.statLabel}>Trips Offset</Text>
            </View>
          </View>
        </View>
        
        <View style={[styles.menuSection, isDarkMode ? styles.darkCard : styles.lightCard]}>
          {menuItems.map((item) => (
            <TouchableOpacity 
              key={item.id}
              style={[
                styles.menuItem,
                item.id !== menuItems[menuItems.length - 1].id && styles.menuItemBorder
              ]}
            >
              <View style={styles.menuItemLeft}>
                {item.icon}
                <Text 
                  style={[
                    styles.menuItemTitle,
                    item.danger ? styles.dangerText : isDarkMode ? styles.darkText : styles.lightText
                  ]}
                >
                  {item.title}
                </Text>
              </View>
              
              <View style={styles.menuItemRight}>
                {item.rightContent}
                <ChevronRight size={20} color={isDarkMode ? '#9CA3AF' : '#9CA3AF'} />
              </View>
            </TouchableOpacity>
          ))}
        </View>
        
        <View style={styles.appInfo}>
          <Text style={styles.appVersion}>Carbo v1.2.3</Text>
          <Text style={styles.appCopyright}>© 2022 Carbo Inc.</Text>
        </View>
        
        <View style={{ height: 80 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  lightBackground: {
    backgroundColor: '#F3F4F6',
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
  lightCard: {
    backgroundColor: '#FFFFFF',
  },
  darkCard: {
    backgroundColor: '#1E1E1E',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
  },
  settingsButton: {
    padding: 8,
  },
  content: {
    flex: 1,
  },
  profileSection: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  profileImagePlaceholder: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  profileInitials: {
    fontSize: 24,
    fontFamily: 'Inter-SemiBold',
    color: '#4B5563',
  },
  profileDetails: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: 'Inter-Regular',
  },
  editProfileButton: {
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  editProfileText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#246BFD',
  },
  themeSection: {
    padding: 16,
    marginTop: 16,
    marginHorizontal: 16,
    borderRadius: 12,
  },
  themeSectionTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 16,
  },
  themeOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  themeOption: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
    marginHorizontal: 4,
  },
  darkThemeOption: {
    backgroundColor: '#2D2D2D',
  },
  themeOptionActive: {
    backgroundColor: '#EFF6FF',
  },
  themeOptionText: {
    marginLeft: 8,
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  darkThemeOptionText: {
    color: '#9CA3AF',
  },
  themeOptionTextActive: {
    color: '#246BFD',
  },
  statsCard: {
    margin: 16,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  statsTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    marginLeft: 12,
  },
  statsContent: {
    flexDirection: 'row',
    padding: 16,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#246BFD',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: 'Inter-Regular',
  },
  statsDivider: {
    width: 1,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 16,
  },
  menuSection: {
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    marginHorizontal: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  menuItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    marginLeft: 16,
  },
  dangerText: {
    color: '#FF4D4F',
  },
  menuItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemInfo: {
    fontSize: 14,
    color: '#6B7280',
    marginRight: 8,
    fontFamily: 'Inter-Regular',
  },
  appInfo: {
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  appVersion: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: 'Inter-Regular',
  },
  appCopyright: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 4,
    fontFamily: 'Inter-Regular',
  },
});