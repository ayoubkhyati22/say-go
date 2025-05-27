import { useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Text,
} from 'react-native';
import { Search as SearchIcon, X } from 'lucide-react-native';
import { useTheme } from './../context/ThemeContext';

interface SearchProps {
  onSearch: (text: string) => void;
  isLoading?: boolean;
}

export function Search({ onSearch, isLoading = false }: SearchProps) {
  const { colors, isDarkMode } = useTheme();
  const [searchText, setSearchText] = useState('');
  const inputRef = useRef<TextInput>(null);

  const handleClearText = () => {
    setSearchText('');
    inputRef.current?.focus();
  };

  const handleSubmit = () => {
    if (searchText.trim()) {
      onSearch(searchText.trim());
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
            editable={!isLoading}
            returnKeyType="search"
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

        <TouchableOpacity
          style={[
            styles.searchButton,
            {
              backgroundColor: colors.primary,
              shadowOpacity: isDarkMode ? 0.3 : 0.15,
            }
          ]}
          onPress={handleSubmit}
          disabled={isLoading || !searchText.trim()}
          activeOpacity={0.8}
        >
          <SearchIcon size={22} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
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
    height: 50,
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
  searchButton: {
    width: 56,
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
});