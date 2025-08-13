import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { searchPokemon } from '../../store/thunks/pokemonThunks';
import { colors } from '../../themes/colors';
import { PokemonResult } from '../../types/pokemon';
import Constant from '../../constants';
import { useNavigation } from '@react-navigation/native';
import { RootNavigationProps } from '../../navigation/type';

const SearchPage = () => {
  const { navigate } = useNavigation<RootNavigationProps>();
  const dispatch = useAppDispatch();
  const { searchResult } = useAppSelector(state => state.pokemon);

  const [query, setQuery] = useState('');
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(
    null,
  );
  const [suggestions, setSuggestions] = useState<PokemonResult[]>([]);

  useEffect(() => {
    dispatch(searchPokemon());
  }, [dispatch]);

  const onSearch = useCallback(
    (text: string) => {
      if (searchResult) {
        if (/^\d+$/.test(text)) {
          const filtered = searchResult.results.filter(result => {
            return result.url
              .replace(`${Constant.BaseUrl}/pokemon/`, '')
              .replace('/', '')
              .includes(text.toLowerCase());
          });
          setSuggestions(filtered);
        } else {
          const filtered = searchResult.results.filter(result => {
            return result.name.toLowerCase().includes(text.toLowerCase());
          });
          setSuggestions(filtered);
        }
      }
    },
    [searchResult],
  );

  const onClear = useCallback(() => {
    setSuggestions([]);
    setQuery('');
  }, []);

  const handleTextChange = useCallback(
    (text: string) => {
      setQuery(text);

      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }

      if (text.trim().length > 0) {
        const timer = setTimeout(() => {
          onSearch(text.trim());
        }, 500);
        setDebounceTimer(timer);
      } else {
        onClear();
      }
    },
    [debounceTimer, onSearch, onClear],
  );

  const handleClear = useCallback(() => {
    setQuery('');
    onClear();
  }, [onClear]);

  const handleOnPress = (item: PokemonResult) => {
    navigate('Detail', {
      pokemonId: item.url.replace(`${Constant.BaseUrl}/pokemon/`, ''),
    });
  };

  const renderItem = ({
    item,
    index,
  }: {
    item: PokemonResult;
    index: number;
  }) => {
    return (
      <Pressable
        key={`pokemon-${item.name}-${index}`}
        style={styles.itemContainer}
        onPress={() => handleOnPress(item)}
      >
        <Text style={styles.itemText}>{item.name}</Text>
      </Pressable>
    );
  };

  if (!searchResult) return null;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search by name or id..."
            value={query}
            onChangeText={handleTextChange}
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="search"
            autoFocus
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
              <Text style={styles.clearIcon}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <FlatList
        data={suggestions}
        renderItem={renderItem}
        keyExtractor={(item, index) => `pokemon-${item.name}-${index}`}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      />
    </SafeAreaView>
  );
};

export default SearchPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    paddingHorizontal: 8,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.shade75,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.shade800,
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 40,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.black,
    paddingVertical: 0,
  },
  clearButton: {
    padding: 4,
  },
  clearIcon: {
    fontSize: 18,
    color: colors.shade800,
  },
  itemContainer: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.shade75,
  },
  itemText: {
    fontSize: 16,
    color: colors.black,
  },
});
