import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';
import { EvolutionChainProps } from '../../../types/detail';
import { colors } from '../../../themes/colors';

const EvolutionChain = ({
  evolutionFrom,
  evolutionTo,
  level,
}: EvolutionChainProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image source={{ uri: evolutionFrom.image }} style={styles.image} />
        <Text style={styles.name}>{evolutionFrom.name}</Text>
      </View>
      <Text style={styles.lavel}>{level ? `Lvl ${level}` : '=>'}</Text>
      <View style={styles.content}>
        <Image source={{ uri: evolutionTo.image }} style={styles.image} />
        <Text style={styles.name}>{evolutionTo.name}</Text>
      </View>
    </View>
  );
};

export default EvolutionChain;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  image: { width: 80, height: 80 },
  name: {
    fontSize: 12,
    color: colors.black,
    marginTop: 8,
    textTransform: 'capitalize',
  },
  lavel: { fontSize: 16, color: colors.black, fontWeight: '800' },
  content: { alignItems: 'center' },
});
