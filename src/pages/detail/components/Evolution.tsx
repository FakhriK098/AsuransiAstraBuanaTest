import { StyleSheet, View } from 'react-native';
import React from 'react';
import { EvolutionProps } from '../../../types/detail';
import Label from './Label';
import EvolutionChain from './EvolutionChain';

const Evolution = ({ evolutions }: EvolutionProps) => {
  if (!evolutions) return null;

  return (
    <View>
      <Label title="Evolution Chain" />
      {evolutions.map((item, index) => (
        <EvolutionChain
          key={index}
          evolutionFrom={{
            name: item.evolutionFrom,
            image: item.evolutionImgFrom,
          }}
          evolutionTo={{
            name: item.evolutionTo,
            image: item.evolutionImgTo,
          }}
          level={item.level}
        />
      ))}
    </View>
  );
};

export default Evolution;

const styles = StyleSheet.create({});
