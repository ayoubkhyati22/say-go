import { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity, 
  StatusBar,
  ActivityIndicator
} from 'react-native';
import { JourneyCard } from '../components/JourneyCard';
import { ArrowLeft, Filter, Calendar, MapPin, Leaf } from 'lucide-react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

// Types from your existing components
interface Station {
  code: string;
  name: string;
}

interface JourneyDetails {
  departureTime: string;
  departureDate: string;
  departureStation: Station;
  arrivalTime: string;
  arrivalStation: Station;
  trainNumber: string;
  duration: string;
  price: number;
  currency: string;
}

interface Journey {
  campany: string;
  index: number;
  journey: JourneyDetails;
}

export default function ResultsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [searchResults, setSearchResults] = useState<Array<Journey & { isSaved: boolean }>>([]);
  
  // Extract search parameters
  const fromStation = params.from?.toString() || 'Casablanca';
  const toStation = params.to?.toString() || 'Tangier';
  const date = params.date?.toString() || 'Today';
  
  useEffect(() => {
    // Simulate API call to fetch results
    const fetchResults = async () => {
      setIsLoading(true);
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Sample search results
      const results = [
        {
          campany: "oncf",
          index: 1,
          journey: {
            departureTime: "08:30",
            departureStation: {
              code: "200",
              name: "casa voyageurs"
            },
            arrivalTime: "14:37",
            arrivalStation: {
              code: "303",
              name: "tanger ville"
            },
            trainNumber: "V60008",
            duration: "6h 7 min",
            price: 190,
            currency: "DH"
          },
          isSaved: false
        },
        {
          campany: "oncf",
          index: 2,
          journey: {
            departureTime: "08:30",
            departureStation: {
              code: "200",
              name: "casa voyageurs"
            },
            arrivalTime: "14:37",
            arrivalStation: {
              code: "303",
              name: "tanger ville"
            },
            trainNumber: "V60008",
            duration: "6h 7 min",
            price: 190,
            currency: "DH"
          },
          isSaved: false
        }
      ];
      
      setSearchResults(results);
      setIsLoading(false);
    };
    
    fetchResults();
  }, [fromStation, toStation, date]);

  const handleGoBack = () => {
    router.back();
  };

  const handleToggleSave = (id: number) => {
    setSearchResults(
      searchResults.map(journey => 
        journey.index === id 
          ? { ...journey, isSaved: !journey.isSaved } 
          : journey
      )
    );
  };

  const handleFilterPress = () => {
    // In a real app, this would open a filter modal or navigate to a filter screen
    console.log('Filter pressed');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <ArrowLeft size={24} color="#1A1A1A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Search Results</Text>
        <TouchableOpacity onPress={handleFilterPress} style={styles.filterButton}>
          <Filter size={24} color="#1A1A1A" />
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.content}>
        {/* Search Parameters */}
        <View style={styles.searchParams}>
          <View style={styles.pillsContainer}>
            <TouchableOpacity style={styles.pill}>
              <Calendar size={16} color="#246BFD" style={styles.pillIcon} />
              <Text style={styles.pillText}>{date}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.pill}>
              <MapPin size={16} color="#246BFD" style={styles.pillIcon} />
              <Text style={styles.pillText}>{fromStation} → {toStation}</Text>
            </TouchableOpacity>
          </View>
          
          {!isLoading && (
            <Text style={styles.resultsCount}>
              {searchResults.length} trips found
            </Text>
          )}
        </View>
        
        {/* CO2 Impact Banner */}
        <View style={styles.co2Banner}>
          <View style={styles.co2IconContainer}>
            <Leaf size={24} color="#10B981" />
          </View>
          <View style={styles.co2TextContainer}>
            <Text style={styles.co2Title}>Reduce your CO2 footprint</Text>
            <Text style={styles.co2Description}>
              Offset your trip's carbon emissions with just a small contribution
            </Text>
          </View>
        </View>
        
        {/* Results List */}
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#246BFD" />
            <Text style={styles.loadingText}>Finding the best routes...</Text>
          </View>
        ) : (
          <View style={styles.resultsList}>
            {searchResults.map((journey) => (
              <JourneyCard 
                campany={journey.campany}
                key={journey.index}
                journey={journey}
                index={journey.index}
                isSaved={journey.isSaved}
                onToggleSave={() => handleToggleSave(journey.index)}
              />
            ))}
          </View>
        )}
        
        {/* Add padding at the bottom for the tab bar */}
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    fontFamily: 'Inter-SemiBold',
  },
  filterButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  searchParams: {
    marginBottom: 16,
  },
  pillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(37, 99, 235, 0.1)',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  pillIcon: {
    marginRight: 6,
  },
  pillText: {
    fontSize: 14,
    color: '#246BFD',
    fontFamily: 'Inter-Medium',
  },
  resultsCount: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: 'Inter-Regular',
  },
  co2Banner: {
    flexDirection: 'row',
    backgroundColor: '#ECFDF5',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  co2IconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  co2TextContainer: {
    flex: 1,
  },
  co2Title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#065F46',
    marginBottom: 4,
    fontFamily: 'Inter-SemiBold',
  },
  co2Description: {
    fontSize: 14,
    color: '#047857',
    fontFamily: 'Inter-Regular',
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  loadingText: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 16,
    fontFamily: 'Inter-Regular',
  },
  resultsList: {
    marginBottom: 16,
  },
});