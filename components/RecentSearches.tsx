import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { MapPin, Clock, ArrowRight, X } from 'lucide-react-native';

interface RecentSearchesProps {
  onSearchSelect: (search: string) => void;
}

export function RecentSearches({ onSearchSelect }: RecentSearchesProps) {
  // Mock data for recent searches
  const recentSearches = [
    'Casa Voyageurs to Tanger Ville Tomorrow',
    'Rabat Agdal to Fes 22 mai'
  ];

  // Mock data for popular destinations
  // const popularDestinations = [
  //   'Casablanca',
  //   'Marrakech',
  //   'Tangier',
  //   'Rabat',
  //   'Fes',
  //   'Agadir'
  // ];

  return (
    <View style={styles.container}>
      {recentSearches.length > 0 && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Searches</Text>
            <TouchableOpacity>
              <Text style={styles.clearText}>Clear All</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.recentList}>
            {recentSearches.map((search, index) => (
              <TouchableOpacity 
                key={`recent-${index}`}
                style={styles.recentItem}
                onPress={() => onSearchSelect(search)}
              >
                <Clock size={18} color="#6B7280" style={styles.itemIcon} />
                <Text style={styles.itemText} numberOfLines={1}>{search}</Text>
                <TouchableOpacity 
                  style={styles.removeButton}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <X size={16} color="#9CA3AF" />
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {/* <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Popular Destinations</Text>
        </View>
        
        <ScrollView 
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.popularScrollContent}
        >
          {popularDestinations.map((destination, index) => (
            <TouchableOpacity 
              key={`dest-${index}`}
              style={styles.popularItem}
              onPress={() => onSearchSelect(destination)}
            >
              <View style={styles.popularItemContent}>
                <MapPin size={18} color="#246BFD" style={styles.itemIcon} />
                <Text style={styles.popularItemText}>{destination}</Text>
              </View>
              <ArrowRight size={16} color="#6B7280" />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#1A1A1A',
  },
  clearText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#246BFD',
  },
  recentList: {
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E5E7EB',
  },
  itemIcon: {
    marginRight: 12,
  },
  itemText: {
    flex: 1,
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#4B5563',
  },
  removeButton: {
    padding: 4,
  },
  popularScrollContent: {
    paddingRight: 16,
  },
  popularItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    marginRight: 12,
    minWidth: 160,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  popularItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
  },
  popularItemText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#1A1A1A',
  },
});