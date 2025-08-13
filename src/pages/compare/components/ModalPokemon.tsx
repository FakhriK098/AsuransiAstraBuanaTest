import {
  Button,
  Dimensions,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { ModalPokemonProps } from '../../../types/compare';
import { Modalize } from 'react-native-modalize';
import { colors } from '../../../themes/colors';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { PokemonResult } from '../../../types/pokemon';
import Constant from '../../../constants';
import { fetchPokemonById } from '../../../store/thunks/pokemonThunks';
import { addPokemonToCompare } from '../../../store/slices/compareSlice';

const { height } = Dimensions.get('screen');

const ModalPokemon = ({ modalRef }: ModalPokemonProps) => {
  const dispatch = useAppDispatch();
  const { options } = useAppSelector(state => state.compare);

  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<PokemonResult[]>(
    options?.results || [],
  );
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(
    null,
  );
  const [selected, setSelected] = useState<PokemonResult | null>(null);

  useEffect(() => {
    if (options) {
      setSuggestions(options.results);
    }
  }, [options]);

  const onSearch = useCallback(
    (text: string) => {
      if (options) {
        if (/^\d+$/.test(text)) {
          const filtered = options.results.filter(result => {
            return result.url
              .replace(`${Constant.BaseUrl}/pokemon/`, '')
              .replace('/', '')
              .includes(text.toLowerCase());
          });
          setSuggestions(filtered);
        } else {
          const filtered = options.results.filter(result => {
            return result.name.toLowerCase().includes(text.toLowerCase());
          });
          setSuggestions(filtered);
        }
      }
    },
    [options],
  );

  const onClear = useCallback(() => {
    setSuggestions(options?.results || []);
    setQuery('');
  }, [options]);

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

  const handleAdd = () => {
    if (selected) {
      dispatch(fetchPokemonById({ id: selected.name, page: 'compare' })).then(
        () => {
          dispatch(addPokemonToCompare());
        },
      );
      setSelected(null);
      modalRef.current?.close();
    }
  };

  const onOpen = () => {
    setQuery('');
    onClear();
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
        style={[
          styles.itemContainer,
          {
            backgroundColor:
              selected?.name === item.name ? colors.shade50 : colors.white,
          },
        ]}
        onPress={() => setSelected(item)}
      >
        <Text style={styles.itemText}>{item.name}</Text>
      </Pressable>
    );
  };

  return (
    <Modalize
      ref={modalRef}
      adjustToContentHeight
      handlePosition="inside"
      onOpen={onOpen}
      scrollViewProps={{
        scrollEnabled: false,
        nestedScrollEnabled: true,
      }}
      HeaderComponent={
        <View style={styles.headerContainer}>
          <Text style={styles.titleHeader}>Pokemons</Text>
        </View>
      }
    >
      <View style={[styles.container, { height: height / 2 }]}>
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
            />
            {query.length > 0 && (
              <TouchableOpacity
                onPress={handleClear}
                style={styles.clearButton}
              >
                <Text style={styles.clearIcon}>✕</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
        <FlatList
          data={suggestions}
          renderItem={renderItem}
          nestedScrollEnabled
          keyExtractor={(item, index) => `pokemon-${item.name}-${index}`}
          showsVerticalScrollIndicator={false}
        />
        <View style={styles.buttonContainer}>
          <Button title="Add" onPress={handleAdd} />
        </View>
      </View>
    </Modalize>
  );
};

export default ModalPokemon;

const styles = StyleSheet.create({
  headerContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderColor: colors.shade75,
  },
  titleHeader: {
    fontSize: 16,
    fontWeight: '600',
  },
  container: {
    padding: 16,
  },
  searchContainer: {
    paddingBottom: 8,
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
  buttonContainer: {
    padding: 8,
  },
});
