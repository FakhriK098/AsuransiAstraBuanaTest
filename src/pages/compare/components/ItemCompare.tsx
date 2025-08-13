/* eslint-disable react-native/no-inline-styles */
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import React from 'react';
import { ItemCompareProps } from '../../../types/compare';
import images from '../../../assets/images';

const ItemCompare = ({
  image,
  name,
  url,
  onPressChoose,
  onPressRemove,
}: ItemCompareProps) => {
  return (
    <View
      style={[styles.container, { borderStyle: image ? 'solid' : 'dashed' }]}
    >
      {image && name ? (
        <View style={styles.itemContainer}>
          <Pressable
            style={styles.removeContainer}
            onPress={() => onPressRemove(name, url || '')}
          >
            <Image source={images.remove} style={styles.iconRemove} />
          </Pressable>
          <Image source={{ uri: image }} style={styles.pokeImage} />
          <Text style={styles.name}>{name}</Text>
        </View>
      ) : (
        <Pressable onPress={onPressChoose} style={styles.itemContainer}>
          <Image source={images.add} style={styles.addImage} />
          <Text>Choose Pokemon</Text>
        </Pressable>
      )}
    </View>
  );
};

export default ItemCompare;

const styles = StyleSheet.create({
  container: {
    width: 150,
    height: 200,
    borderWidth: 1,
    marginEnd: 8,
    borderRadius: 16,
  },
  itemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  pokeImage: {
    width: 150,
    height: 150,
    borderRadius: 16,
  },
  addImage: {
    width: 32,
    height: 32,
    marginBottom: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  removeContainer: {
    position: 'absolute',
    top: 4,
    right: 4,
    padding: 4,
    zIndex: 99,
  },
  iconRemove: {
    width: 24,
    height: 24,
  },
});
