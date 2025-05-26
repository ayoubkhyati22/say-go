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
import { useTheme } from '../../context/ThemeContext';
import Animated from 'react-native-reanimated';

export default function ProfileScreen() {
  const { theme, setTheme, isDarkMode, colors } = useTheme();
  
  const user = {
    name: 'Ayoub KHYATI',
    email: 'ayoub.kh@example.com',
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
      icon: <UserIcon size={20} color={colors.primary} />,
      rightContent: null,
    },
    {
      id: 'payment',
      title: 'Payment Methods',
      icon: <CreditCard size={20} color={colors.primary} />,
      rightContent: <Text style={[styles.itemInfo, { color: colors.secondaryText }]}>Mastercard •••• 4778</Text>,
    },
    {
      id: 'notifications',
      title: 'Notifications',
      icon: <Bell size={20} color={colors.primary} />,
      rightContent: null,
    },
    {
      id: 'location',
      title: 'Location',
      icon: <MapPin size={20} color={colors.primary} />,
      rightContent: <Text style={[styles.itemInfo, { color: colors.secondaryText }]}>Casablanca</Text>,
    },
    {
      id: 'security',
      title: 'Security',
      icon: <Shield size={20} color={colors.primary} />,
      rightContent: null,
    },
    {
      id: 'help',
      title: 'Help & Support',
      icon: <HelpCircle size={20} color={colors.primary} />,
      rightContent: null,
    },
    {
      id: 'logout',
      title: 'Logout',
      icon: <LogOut size={20} color={colors.error} />,
      rightContent: null,
      danger: true,
    },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
      
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Profile</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Settings size={24} color={colors.text} />
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.content}>
        <View style={[styles.profileSection, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
          <View style={styles.profileInfo}>
            <View style={[styles.profileImagePlaceholder, { backgroundColor: colors.secondary }]}>
              <Text style={[styles.profileInitials, { color: colors.text }]}>
                {user.name.split(' ').map(n => n[0]).join('')}
              </Text>
            </View>
            <View style={styles.profileDetails}>
              <Text style={[styles.profileName, { color: colors.text }]}>
                {user.name}
              </Text>
              <Text style={[styles.profileEmail, { color: colors.secondaryText }]}>{user.email}</Text>
            </View>
          </View>
          
          <TouchableOpacity style={[styles.editProfileButton, { backgroundColor: colors.secondary }]}>
            <Text style={[styles.editProfileText, { color: colors.text }]}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.themeSection, { backgroundColor: colors.card }]}>
          <Text style={[styles.themeSectionTitle, { color: colors.text }]}>
            Appearance
          </Text>
          <View style={styles.themeOptions}>
            {themeOptions.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.themeOption,
                  { backgroundColor: colors.background },
                  theme === option.id && { backgroundColor: colors.primary }
                ]}
                onPress={() => setTheme(option.id)}
              >
                <option.icon
                  size={20}
                  color={theme === option.id ? colors.text : colors.secondaryText}
                />
                <Text
                  style={[
                    styles.themeOptionText,
                    { color: theme === option.id ? colors.text : colors.secondaryText }
                  ]}
                >
                  {option.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        <View style={[styles.statsCard, { backgroundColor: colors.card }]}>
          <View style={styles.statsHeader}>
            <Leaf size={20} color={colors.success} />
            <Text style={[styles.statsTitle, { color: colors.text }]}>
              Your CO2 Impact
            </Text>
          </View>
          
          <View style={styles.statsContent}>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: colors.primary }]}>{user.totalSaved}</Text>
              <Text style={[styles.statLabel, { color: colors.secondaryText }]}>CO2 Saved</Text>
            </View>
            
            <View style={[styles.statsDivider, { backgroundColor: colors.border }]} />
            
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: colors.primary }]}>{user.savedTrips}</Text>
              <Text style={[styles.statLabel, { color: colors.secondaryText }]}>Trips Offset</Text>
            </View>
          </View>
        </View>
        
        <View style={[styles.menuSection, { backgroundColor: colors.card }]}>
          {menuItems.map((item) => (
            <TouchableOpacity 
              key={item.id}
              style={[
                styles.menuItem,
                item.id !== menuItems[menuItems.length - 1].id && { borderBottomColor: colors.border }
              ]}
            >
              <View style={styles.menuItemLeft}>
                {item.icon}
                <Text 
                  style={[
                    styles.menuItemTitle,
                    { color: item.danger ? colors.error : colors.text }
                  ]}
                >
                  {item.title}
                </Text>
              </View>
              
              <View style={styles.menuItemRight}>
                {item.rightContent}
                <ChevronRight size={20} color={colors.secondaryText} />
              </View>
            </TouchableOpacity>
          ))}
        </View>
        
        <View style={styles.appInfo}>
          <Text style={[styles.appVersion, { color: colors.secondaryText }]}>SayGo v1.0.0</Text>
          <Text style={[styles.appCopyright, { color: colors.secondaryText }]}>© 2025 SayGo Inc.</Text>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 40,
    borderBottomWidth: 1,
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
  },
  profileInfo: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  profileImagePlaceholder: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  profileInitials: {
    fontSize: 24,
    fontFamily: 'Inter-SemiBold',
  },
  profileDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  profileName: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  editProfileButton: {
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  editProfileText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
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
    marginHorizontal: 4,
  },
  themeOptionText: {
    marginLeft: 8,
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  statsCard: {
    margin: 16,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
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
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  statsDivider: {
    width: 1,
    marginHorizontal: 16,
  },
  menuSection: {
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
    borderBottomWidth: 1,
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
  menuItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemInfo: {
    fontSize: 14,
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
    fontFamily: 'Inter-Regular',
  },
  appCopyright: {
    fontSize: 12,
    marginTop: 4,
    fontFamily: 'Inter-Regular',
  },
});