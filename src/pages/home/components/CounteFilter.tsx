import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { colors } from '../../../themes/colors';

const CounteFilter = ({ count }: { count: number }) => {
  if (count === 0) return null;
  return (
    <View style={styles.countFilterContainer}>
      <Text style={styles.textFilter}>{count}</Text>
    </View>
  );
};

export default CounteFilter;

const styles = StyleSheet.create({
  countFilterContainer: {
    width: 16,
    height: 16,
    borderRadius: 16,
    position: 'absolute',
    top: 2,
    right: 2,
    backgroundColor: colors.red,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 99,
  },
  textFilter: {
    fontSize: 12,
    color: colors.white,
  },
});
