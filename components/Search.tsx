import { useState, useEffect, useRef } from 'react';
import { 
  StyleSheet, 
  View, 
  TextInput, 
  TouchableOpacity, 
  ActivityIndicator,
  Animated,
  Text,
  Platform
} from 'react-native';
import { Mic, Search as SearchIcon, X } from 'lucide-react-native';
import { VoiceWaveform } from './VoiceWaveform';
import { useTheme } from '@/context/ThemeContext';
import { searchTravelOptions } from '@/services/api';

// Only import Voice on native platforms
let Voice: any;
if (Platform.OS !== 'web') {
  Voice = require('@react-native-voice/voice').default;
}

interface SearchProps {
  onSearch: (text: string) => void;
  isLoading?: boolean;
}

export function Search({ onSearch, isLoading = false }: SearchProps) {
  const { colors, isDarkMode } = useTheme();
  const [searchText, setSearchText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingError, setRecordingError] = useState<string | null>(null);
  const [recognizedText, setRecognizedText] = useState<string>('');
  const inputRef = useRef<TextInput>(null);
  const waveformOpacity = useRef(new Animated.Value(0)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;
  
  useEffect(() => {
    // Only initialize voice recognition on native platforms
    if (Platform.OS !== 'web' && Voice) {
      Voice.onSpeechResults = onSpeechResults;
      Voice.onSpeechError = onSpeechError;
      Voice.onSpeechEnd = onSpeechEnd;

      return () => {
        Voice.destroy().then(Voice.removeAllListeners);
      };
    }
  }, []);

  const onSpeechResults = async (e: any) => {
    if (e.value && e.value.length > 0) {
      const text = e.value[0];
      setRecognizedText(text);
      setSearchText(text);
      
      try {
        const results = await searchTravelOptions(text);
        if (results && results.length > 0) {
          onSearch(text);
        }
      } catch (error) {
        console.error('Error searching travel options:', error);
      }
    }
  };

  const onSpeechError = (e: any) => {
    setRecordingError('Voice recognition failed. Please try again.');
    stopRecording();
  };

  const onSpeechEnd = () => {
    stopRecording();
  };

  const startRecording = async () => {
    if (Platform.OS === 'web') {
      setRecordingError('Voice recognition is not available on web.');
      return;
    }

    setRecordingError(null);
    setRecognizedText('');
    
    try {
      await Voice.start('en-US');
      setIsRecording(true);
      
      // Animate the waveform to fade in
      Animated.timing(waveformOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
      
      // Animate the button to pulse
      Animated.loop(
        Animated.sequence([
          Animated.timing(buttonScale, {
            toValue: 1.1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(buttonScale, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      ).start();
      
    } catch (e) {
      console.error(e);
      setRecordingError('Unable to start recording.');
    }
  };

  const stopRecording = async () => {
    if (Platform.OS === 'web') return;

    try {
      await Voice.stop();
    } catch (e) {
      console.error(e);
    } finally {
      setIsRecording(false);
      
      // Stop animations
      Animated.timing(waveformOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
      
      buttonScale.stopAnimation();
      Animated.timing(buttonScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }).start();
    }
  };

  const handleMicPress = () => {
    if (isRecording) {
      stopRecording();
    } else {
      // Clear text if there's any
      if (searchText) {
        setSearchText('');
      }
      startRecording();
    }
  };

  const handleClearText = () => {
    setSearchText('');
    setRecognizedText('');
    inputRef.current?.focus();
  };

  const handleSubmit = async () => {
    if (searchText.trim()) {
      try {
        const results = await searchTravelOptions(searchText);
        if (results && results.length > 0) {
          onSearch(searchText);
        }
      } catch (error) {
        console.error('Error searching travel options:', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={[
          styles.inputContainer, 
          { 
            backgroundColor: colors.card,
            shadowOpacity: isDarkMode ? 0.2 : 0.05,
            borderWidth: 1,
            borderColor: colors.border,
          }
        ]}>
          <SearchIcon size={20} color={colors.secondaryText} style={styles.searchIcon} />
          <TextInput
            ref={inputRef}
            style={[styles.input, { color: colors.text }]}
            placeholder="Where do you want to go?"
            placeholderTextColor={colors.secondaryText}
            value={searchText}
            onChangeText={setSearchText}
            onSubmitEditing={handleSubmit}
            editable={!isRecording && !isLoading}
          />
          {searchText.length > 0 && !isLoading && (
            <TouchableOpacity 
              style={styles.clearButton} 
              onPress={handleClearText}
            >
              <X size={18} color={colors.secondaryText} />
            </TouchableOpacity>
          )}
          {isLoading && (
            <ActivityIndicator size="small" color={colors.primary} style={styles.loader} />
          )}
        </View>
        
        <Animated.View 
          style={[
            styles.micButtonContainer,
            { transform: [{ scale: buttonScale }] }
          ]}
        >
          <TouchableOpacity
            style={[
              styles.micButton,
              { 
                backgroundColor: colors.card,
                borderColor: colors.border,
                shadowOpacity: isDarkMode ? 0.2 : 0.1,
              },
              isRecording && { 
                backgroundColor: colors.primary,
                borderColor: colors.primary 
              }
            ]}
            onPress={handleMicPress}
            disabled={isLoading}
          >
            <Mic 
              size={22} 
              color={isRecording ? "#FFFFFF" : colors.primary} 
            />
          </TouchableOpacity>
        </Animated.View>
      </View>
      
      <Animated.View 
        style={[
          styles.waveformContainer, 
          { opacity: waveformOpacity }
        ]}
      >
        {isRecording && <VoiceWaveform />}
      </Animated.View>
      
      {recordingError && (
        <Text style={[
          styles.errorText, 
          { color: colors.error || '#FF3B30' }
        ]}>
          {recordingError}
        </Text>
      )}

      {recognizedText && (
        <View style={[styles.recognizedTextContainer, { backgroundColor: colors.card }]}>
          <Text style={[styles.recognizedTextLabel, { color: colors.secondaryText }]}>
            Recognized Text:
          </Text>
          <Text style={[styles.recognizedTextContent, { color: colors.text }]}>
            {recognizedText}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 56,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 2,
    marginRight: 12,
  },
  searchIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  clearButton: {
    padding: 4,
  },
  loader: {
    marginLeft: 8,
  },
  micButtonContainer: {
    width: 56,
    height: 56,
  },
  micButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
  },
  waveformContainer: {
    height: 64,
    marginTop: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
  },
  recognizedTextContainer: {
    marginTop: 16,
    padding: 12,
    borderRadius: 8,
  },
  recognizedTextLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    marginBottom: 4,
  },
  recognizedTextContent: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
  },
});