import { Button, Platform, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Modalize } from 'react-native-modalize';
import { ModalFilterProps } from '../../../types/home';
import { colors } from '../../../themes/colors';
import SectionFilter from './SectionFilter';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  getPokemonColors,
  getPokemonMoves,
  getPokemonTypes,
} from '../../../store/thunks/pokemonThunks';
import { resetFilter, setFilter } from '../../../store/slices/pokemonSlice';

const ModalFilter = ({ modalRef }: ModalFilterProps) => {
  const dispatch = useAppDispatch();
  const {
    pokemonMoves,
    pokemonTypes,
    pokemonColors,
    moveSelected,
    typeSelected,
    colorSelected,
  } = useAppSelector(state => state.pokemon);

  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [selectedMove, setSelectedMove] = useState<string>('');

  useEffect(() => {
    dispatch(getPokemonMoves());
    dispatch(getPokemonTypes());
    dispatch(getPokemonColors());
  }, [dispatch]);

  const handleApplyFilter = () => {
    dispatch(
      setFilter({
        moveSelected: selectedMove,
        typeSelected: selectedType,
        colorSelected: selectedColor,
      }),
    );
    modalRef.current?.close();
  };

  const handleClearFilter = () => {
    setSelectedColor('');
    setSelectedType('');
    setSelectedMove('');
    dispatch(resetFilter());
    modalRef.current?.close();
  };

  const onOpen = () => {
    setSelectedColor(colorSelected || '');
    setSelectedType(typeSelected || '');
    setSelectedMove(moveSelected || '');
  };

  return (
    <Modalize
      ref={modalRef}
      adjustToContentHeight
      handlePosition="inside"
      onOpen={onOpen}
      HeaderComponent={
        <View style={styles.headerContainer}>
          <Text style={styles.titleHeader}>Filter</Text>
        </View>
      }
    >
      <View style={styles.contentContainer}>
        <SectionFilter
          title="Move"
          options={pokemonMoves?.results.map(item => item.name) || []}
          onSelected={setSelectedMove}
          selected={selectedMove}
        />
        <SectionFilter
          title="Type"
          options={pokemonTypes?.results.map(item => item.name) || []}
          onSelected={setSelectedType}
          selected={selectedType}
        />
        <SectionFilter
          title="Color"
          options={pokemonColors?.results.map(item => item.name) || []}
          onSelected={setSelectedColor}
          selected={selectedColor}
        />
        <View style={styles.containerButton}>
          <View style={styles.button}>
            <Button title="Clear" onPress={handleClearFilter} color="red" />
          </View>
          <View style={styles.button}>
            <Button title="Apply" onPress={handleApplyFilter} color="blue" />
          </View>
        </View>
      </View>
    </Modalize>
  );
};

export default ModalFilter;

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
  contentContainer: {
    paddingVertical: 16,
  },
  containerButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    marginBottom: Platform.select({ ios: 16, android: 0 }),
  },
  button: {
    width: '48%',
  },
});
