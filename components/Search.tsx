import { useState, useEffect, useRef } from 'react';
import { 
  StyleSheet, 
  View, 
  TextInput, 
  TouchableOpacity, 
  ActivityIndicator,
  Animated,
  Text
} from 'react-native';
import { Mic, Search as SearchIcon, X } from 'lucide-react-native';
import Voice, { SpeechResultsEvent, SpeechErrorEvent } from '@react-native-voice/voice';
import { VoiceWaveform } from './VoiceWaveform';

interface SearchProps {
  onSearch: (text: string) => void;
  isLoading?: boolean;
}

export function Search({ onSearch, isLoading = false }: SearchProps) {
  const [searchText, setSearchText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingError, setRecordingError] = useState<string | null>(null);
  const inputRef = useRef<TextInput>(null);
  const waveformOpacity = useRef(new Animated.Value(0)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;
  
  useEffect(() => {
    // Initialize voice recognition
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechEnd = onSpeechEnd;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechResults = (e: SpeechResultsEvent) => {
    if (e.value && e.value.length > 0) {
      const recognizedText = e.value[0];
      setSearchText(recognizedText);
      setTimeout(() => {
        onSearch(recognizedText);
      }, 500);
    }
  };

  const onSpeechError = (e: SpeechErrorEvent) => {
    setRecordingError('Voice recognition failed. Please try again.');
    stopRecording();
  };

  const onSpeechEnd = () => {
    stopRecording();
  };

  const startRecording = async () => {
    setRecordingError(null);
    
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
    inputRef.current?.focus();
  };

  const handleSubmit = () => {
    if (searchText.trim()) {
      onSearch(searchText);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.inputContainer}>
          <SearchIcon size={20} color="#6B7280" style={styles.searchIcon} />
          <TextInput
            ref={inputRef}
            style={styles.input}
            placeholder="Where do you want to go?"
            placeholderTextColor="#9CA3AF"
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
              <X size={18} color="#9CA3AF" />
            </TouchableOpacity>
          )}
          {isLoading && (
            <ActivityIndicator size="small" color="#246BFD" style={styles.loader} />
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
              isRecording && styles.micButtonActive
            ]}
            onPress={handleMicPress}
            disabled={isLoading}
          >
            <Mic 
              size={22} 
              color={isRecording ? "#FFFFFF" : "#246BFD"} 
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
        <Text style={styles.errorText}>{recordingError}</Text>
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
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 56,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
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
    color: '#1A1A1A',
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
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  micButtonActive: {
    backgroundColor: '#246BFD',
    borderColor: '#246BFD',
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
    color: '#FF3B30',
    marginTop: 8,
    textAlign: 'center',
  },
});