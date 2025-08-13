import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import React, { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import ItemCompare from './components/ItemCompare';
import { Modalize } from 'react-native-modalize';
import ModalPokemon from './components/ModalPokemon';
import { searchPokemon } from '../../store/thunks/pokemonThunks';
import { colors } from '../../themes/colors';
import {
  addPokemonToCompare,
  removePokemonToCompare,
  resetState,
} from '../../store/slices/compareSlice';
import TableCompare from './components/TableCompare';
import { useRoute } from '@react-navigation/native';
import { CompareNavigationParams } from '../../navigation/type';

const ComparePage = () => {
  const { params } = useRoute<CompareNavigationParams>();
  const dispatch = useAppDispatch();
  const { availableSlot, pokemonList, optionLoading } = useAppSelector(
    state => state.compare,
  );
  const modalFilterRef = useRef<Modalize>(null);

  useEffect(() => {
    dispatch(searchPokemon()).then(() => {
      if (params && params.pokemonId) {
        dispatch(addPokemonToCompare());
      }
    });

    return () => {
      dispatch(resetState());
    };
  }, [dispatch, params]);

  const onPressChoose = () => {
    modalFilterRef.current?.open();
  };

  const onPressRemove = (name: string, url: string) => {
    dispatch(removePokemonToCompare({ name, url }));
  };
  console.log('pokemonList', pokemonList);
  return (
    <SafeAreaView style={styles.container}>
      {optionLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.black} />
        </View>
      )}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.compareContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {Array(availableSlot)
              .fill(0)
              .map((_, index) => (
                <View key={index}>
                  <ItemCompare
                    image={
                      pokemonList[index]?.sprites.other['official-artwork']
                        .front_default
                    }
                    name={pokemonList[index]?.name}
                    url={pokemonList[index]?.species.url}
                    onPressChoose={onPressChoose}
                    onPressRemove={onPressRemove}
                  />
                </View>
              ))}
          </ScrollView>
          <TableCompare />
        </View>
      </ScrollView>

      <ModalPokemon modalRef={modalFilterRef} />
    </SafeAreaView>
  );
};

export default ComparePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  compareContainer: {
    paddingTop: 32,
    paddingLeft: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.shade50,
    zIndex: 10,
    opacity: 0.4,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});
