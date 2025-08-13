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
import { Modalize } from 'react-native-modalize';
import ModalFilter from './components/ModalFilter';
import FloatingCompare from '../../components/FloatingCompare';
import CounteFilter from './components/CounteFilter';

const HomePage = () => {
  const { navigate } = useNavigation<RootNavigationProps>();
  const dispatch = useAppDispatch();
  const { pokemonList, loading, countFilter } = useAppSelector(
    state => state.pokemon,
  );
  const [offset, setOffset] = React.useState(0);
  const [isLoadingMore, setIsLoadingMore] = React.useState(false);
  const hasMoreData = useRef(true);
  const modalFilterRef = useRef<Modalize>(null);

  useEffect(() => {
    dispatch(fetchPokemonList({ offset: 0 }));
  }, [dispatch]);

  const handleSearch = () => {
    navigate('Search');
  };

  const handleRefresh = useCallback(() => {
    if (countFilter > 0) return;
    dispatch(fetchPokemonList({ offset: 0 }));
  }, [dispatch, countFilter]);

  const handleLoadMore = useCallback(() => {
    if (loading || isLoadingMore || !hasMoreData.current) return;

    if (countFilter > 0) return;

    const newOffset = offset + 1;
    setIsLoadingMore(true);
    setOffset(newOffset);

    dispatch(fetchPokemonList({ offset: newOffset })).finally(() => {
      setIsLoadingMore(false);
    });
  }, [dispatch, offset, loading, isLoadingMore, countFilter]);

  const handleFilter = () => {
    modalFilterRef.current?.open();
  };

  const renderFooter = () => {
    if (!isLoadingMore && !loading) return null;

    return (
      <View style={styles.containerLoading}>
        <ActivityIndicator size="small" />
      </View>
    );
  };

  const renderEmpty = () => {
    return (
      <View style={styles.containerEmpty}>
        <Text style={styles.textEmpty}>Data No Found</Text>
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
        <Pressable style={styles.filterContainer} onPress={handleFilter}>
          <CounteFilter count={countFilter} />
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
        ListEmptyComponent={renderEmpty}
        onEndReachedThreshold={0.5}
        onEndReached={handleLoadMore}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={handleRefresh} />
        }
      />
      <FloatingCompare onPress={() => navigate('Compare')} />
      <ModalFilter modalRef={modalFilterRef} />
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
  containerEmpty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textEmpty: {
    fontSize: 16,
    fontWeight: '600',
  },
});
