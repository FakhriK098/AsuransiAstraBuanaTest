/* eslint-disable react-native/no-inline-styles */
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useAppSelector } from '../../../store/hooks';
import { colors } from '../../../themes/colors';

const TableCompare = () => {
  const { pokemonList } = useAppSelector(state => state.compare);

  if (pokemonList.length === 0) {
    return null;
  }

  return (
    <View>
      <Text style={styles.titleText}>Compare Result</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.table}>
          <View style={[styles.row, styles.header]}>
            <Text style={[styles.cell, styles.headerText, { width: 200 }]}>
              Name
            </Text>
            <Text style={[styles.cell, styles.headerText, { width: 68 }]}>
              Hp
            </Text>
            <Text style={[styles.cell, styles.headerText, { width: 68 }]}>
              Attack
            </Text>
            <Text style={[styles.cell, styles.headerText, { width: 82 }]}>
              Defense
            </Text>
            <Text style={[styles.cell, styles.headerText, { width: 130 }]}>
              Special Attack
            </Text>
            <Text style={[styles.cell, styles.headerText, { width: 150 }]}>
              Special Defense
            </Text>
            <Text style={[styles.cell, styles.headerText, { width: 68 }]}>
              Speed
            </Text>
          </View>
          {pokemonList.map((pokemon, index) => (
            <View key={index} style={styles.row}>
              <Text style={[styles.cell, { width: 200 }]}>{pokemon.name}</Text>
              <Text style={[styles.cell, { width: 68 }]}>
                {pokemon.stats[0].base_stat}
              </Text>
              <Text style={[styles.cell, { width: 68 }]}>
                {pokemon.stats[1].base_stat}
              </Text>
              <Text style={[styles.cell, { width: 82 }]}>
                {pokemon.stats[2].base_stat}
              </Text>
              <Text style={[styles.cell, { width: 130 }]}>
                {pokemon.stats[3].base_stat}
              </Text>
              <Text style={[styles.cell, { width: 150 }]}>
                {pokemon.stats[4].base_stat}
              </Text>
              <Text style={[styles.cell, { width: 68 }]}>
                {pokemon.stats[5].base_stat}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default TableCompare;

const styles = StyleSheet.create({
  table: {
    borderWidth: 1,
    borderColor: colors.black,
    marginTop: 16,
  },
  row: {
    flexDirection: 'row',
  },
  header: {
    backgroundColor: colors.shade50,
  },
  cell: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: colors.black,
  },
  headerText: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  titleText: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 32,
  },
});
