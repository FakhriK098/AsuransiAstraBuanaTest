import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useEffect, useCallback, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchPokemonList } from '../../store/thunks/pokemonThunks';
import { Pokemon } from '../../types/pokemon';
import CardPokemon from './components/CardPokemon';
import { colors } from '../../themes/colors';
import images from '../../assets/images';
import { useNavigation } from '@react-navigation/native';
import { RootNavigationProps } from '../../navigation/type';

const HomePage = () => {
  const { navigate } = useNavigation<RootNavigationProps>();
  const dispatch = useAppDispatch();
  const { pokemonList, loading, totalCount } = useAppSelector(
    state => state.pokemon,
  );
  const [offset, setOffset] = React.useState(0);
  const [isLoadingMore, setIsLoadingMore] = React.useState(false);
  const hasMoreData = useRef(true);

  useEffect(() => {
    dispatch(fetchPokemonList({ offset: 0 }));
  }, [dispatch]);

  const handleSearch = () => {
    navigate('Search');
  };

  const handleRefresh = useCallback(() => {
    dispatch(fetchPokemonList({ offset: 0 }));
  }, [dispatch]);

  const handleLoadMore = useCallback(() => {
    if (loading || isLoadingMore || !hasMoreData.current) return;

    if (pokemonList.length >= totalCount && totalCount > 0) {
      hasMoreData.current = false;
      return;
    }

    const newOffset = offset + 1;
    setIsLoadingMore(true);
    setOffset(newOffset);

    dispatch(fetchPokemonList({ offset: newOffset })).finally(() => {
      setIsLoadingMore(false);
    });
  }, [
    dispatch,
    offset,
    loading,
    isLoadingMore,
    pokemonList.length,
    totalCount,
  ]);

  const renderFooter = () => {
    if (!isLoadingMore && !loading) return null;

    return (
      <View style={styles.containerLoading}>
        <ActivityIndicator size="small" />
      </View>
    );
  };

  const renderItem = ({ item, index }: { item: Pokemon; index: number }) => {
    return <CardPokemon key={`pokemon-${item.id}-${index}`} item={item} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Pressable style={styles.searchContainer} onPress={handleSearch}>
          <Text style={styles.textSearch}>Search</Text>
        </Pressable>
        <Pressable style={styles.filterContainer}>
          <Image source={images.filter} style={styles.imageFilter} />
        </Pressable>
      </View>
      <FlatList
        data={pokemonList}
        renderItem={renderItem}
        numColumns={2}
        keyExtractor={(item, index) => `pokemon-${item.id}-${index}`}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={renderFooter}
        onEndReachedThreshold={0.5}
        onEndReached={handleLoadMore}
        refreshControl={
          <RefreshControl
            refreshing={loading && pokemonList.length === 0}
            onRefresh={handleRefresh}
          />
        }
      />
    </SafeAreaView>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerLoading: {
    marginVertical: 10,
  },
  headerContainer: {
    paddingHorizontal: 8,
    paddingVertical: 8,
    // marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  searchContainer: {
    flex: 0.9,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: colors.black,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: colors.white,
  },
  filterContainer: {
    flex: 0.1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: colors.black,
    paddingVertical: 6,
    backgroundColor: colors.white,
  },
  textSearch: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.black,
  },
  imageFilter: {
    width: 24,
    height: 24,
  },
});
