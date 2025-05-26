import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { MapPin, Clock, ArrowRight, X } from 'lucide-react-native';
import { useTheme } from './../context/ThemeContext';

interface RecentSearchesProps {
  onSearchSelect: (search: string) => void;
}

export function RecentSearches({ onSearchSelect }: RecentSearchesProps) {
  const { colors, isDarkMode } = useTheme();
  
  // Mock data for recent searches
  const recentSearches = [
    'Casa Voyageurs to Tanger Ville Tomorrow',
    'Rabat Agdal to Fes 29 mai'
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
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Recent Searches
            </Text>
            <TouchableOpacity>
              <Text style={[styles.clearText, { color: colors.primary }]}>
                Clear All
              </Text>
            </TouchableOpacity>
          </View>
          
          <View style={[
            styles.recentList, 
            { 
              backgroundColor: colors.card,
              shadowOpacity: isDarkMode ? 0.2 : 0.05
            }
          ]}>
            {recentSearches.map((search, index) => (
              <TouchableOpacity 
                key={`recent-${index}`}
                style={[
                  styles.recentItem, 
                  { 
                    borderBottomColor: colors.border 
                  }
                ]}
                onPress={() => onSearchSelect(search)}
              >
                <Clock size={18} color={colors.secondaryText} style={styles.itemIcon} />
                <Text style={[styles.itemText, { color: colors.secondaryText }]} numberOfLines={1}>
                  {search}
                </Text>
                <TouchableOpacity 
                  style={styles.removeButton}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <X size={16} color={colors.secondaryText} />
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {/* Commented out the popular destinations section, but applying theme colors */}
      {/* <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Popular Destinations
          </Text>
        </View>
        
        <ScrollView 
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.popularScrollContent}
        >
          {popularDestinations.map((destination, index) => (
            <TouchableOpacity 
              key={`dest-${index}`}
              style={[
                styles.popularItem, 
                { 
                  backgroundColor: colors.card,
                  shadowOpacity: isDarkMode ? 0.2 : 0.05 
                }
              ]}
              onPress={() => onSearchSelect(destination)}
            >
              <View style={styles.popularItemContent}>
                <MapPin size={18} color={colors.primary} style={styles.itemIcon} />
                <Text style={[styles.popularItemText, { color: colors.text }]}>
                  {destination}
                </Text>
              </View>
              <ArrowRight size={16} color={colors.secondaryText} />
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
  },
  clearText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
  recentList: {
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 2,
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  itemIcon: {
    marginRight: 12,
  },
  itemText: {
    flex: 1,
    fontFamily: 'Inter-Regular',
    fontSize: 14,
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
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    marginRight: 12,
    minWidth: 160,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
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
  },
});