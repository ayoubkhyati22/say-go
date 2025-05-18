import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity, 
  StatusBar,
  Image
} from 'react-native';
import { 
  Settings, 
  CreditCard, 
  ChevronRight, 
  Bell, 
  Shield, 
  HelpCircle, 
  LogOut, 
  MapPin, 
  User as UserIcon,
  Leaf
} from 'lucide-react-native';

export default function ProfileScreen() {
  // Mock user data
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    profileImage: null, // In a real app, this would be a URI
    totalSaved: '32.4 kg',
    savedTrips: 12
  };

  const menuItems = [
    {
      id: 'account',
      title: 'Account Settings',
      icon: <UserIcon size={20} color="#246BFD" />,
      rightContent: null,
    },
    {
      id: 'payment',
      title: 'Payment Methods',
      icon: <CreditCard size={20} color="#246BFD" />,
      rightContent: <Text style={styles.itemInfo}>Mastercard •••• 4778</Text>,
    },
    {
      id: 'notifications',
      title: 'Notifications',
      icon: <Bell size={20} color="#246BFD" />,
      rightContent: null,
    },
    {
      id: 'location',
      title: 'Location',
      icon: <MapPin size={20} color="#246BFD" />,
      rightContent: <Text style={styles.itemInfo}>Casablanca</Text>,
    },
    {
      id: 'security',
      title: 'Security',
      icon: <Shield size={20} color="#246BFD" />,
      rightContent: null,
    },
    {
      id: 'help',
      title: 'Help & Support',
      icon: <HelpCircle size={20} color="#246BFD" />,
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

  const handleMenuItemPress = (id: string) => {
    console.log(`Menu item pressed: ${id}`);
    // Handle navigation or actions based on the menu item
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Settings size={24} color="#1A1A1A" />
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.content}>
        {/* Profile Info */}
        <View style={styles.profileSection}>
          <View style={styles.profileInfo}>
            {user.profileImage ? (
              <Image source={{ uri: user.profileImage }} style={styles.profileImage} />
            ) : (
              <View style={styles.profileImagePlaceholder}>
                <Text style={styles.profileInitials}>
                  {user.name.split(' ').map(n => n[0]).join('')}
                </Text>
              </View>
            )}
            <View style={styles.profileDetails}>
              <Text style={styles.profileName}>{user.name}</Text>
              <Text style={styles.profileEmail}>{user.email}</Text>
            </View>
          </View>
          
          <TouchableOpacity style={styles.editProfileButton}>
            <Text style={styles.editProfileText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
        
        {/* CO2 Stats */}
        <View style={styles.statsCard}>
          <View style={styles.statsHeader}>
            <Leaf size={20} color="#10B981" />
            <Text style={styles.statsTitle}>Your CO2 Impact</Text>
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
        
        {/* Menu */}
        <View style={styles.menuSection}>
          {menuItems.map((item) => (
            <TouchableOpacity 
              key={item.id}
              style={styles.menuItem}
              onPress={() => handleMenuItemPress(item.id)}
            >
              <View style={styles.menuItemLeft}>
                {item.icon}
                <Text 
                  style={[
                    styles.menuItemTitle,
                    item.danger ? styles.dangerText : null
                  ]}
                >
                  {item.title}
                </Text>
              </View>
              
              <View style={styles.menuItemRight}>
                {item.rightContent}
                <ChevronRight size={20} color="#9CA3AF" />
              </View>
            </TouchableOpacity>
          ))}
        </View>
        
        {/* App Info */}
        <View style={styles.appInfo}>
          <Text style={styles.appVersion}>Carbo v1.2.3</Text>
          <Text style={styles.appCopyright}>© 2022 Carbo Inc.</Text>
        </View>
        
        {/* Add bottom padding */}
        <View style={{ height: 80 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
    fontFamily: 'Inter-Bold',
  },
  settingsButton: {
    padding: 8,
  },
  content: {
    flex: 1,
  },
  profileSection: {
    backgroundColor: 'white',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 16,
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
    fontWeight: '600',
    color: '#4B5563',
    fontFamily: 'Inter-SemiBold',
  },
  profileDetails: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
    fontFamily: 'Inter-SemiBold',
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
    fontWeight: '500',
    color: '#246BFD',
    fontFamily: 'Inter-Medium',
  },
  statsCard: {
    backgroundColor: 'white',
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
    fontWeight: '600',
    color: '#1A1A1A',
    marginLeft: 12,
    fontFamily: 'Inter-SemiBold',
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
    fontWeight: '700',
    color: '#246BFD',
    marginBottom: 4,
    fontFamily: 'Inter-Bold',
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
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1A1A1A',
    marginLeft: 16,
    fontFamily: 'Inter-Medium',
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