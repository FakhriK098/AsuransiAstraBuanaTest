import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { LabelProps } from '../../../types/detail';

const Label = ({ title, value }: LabelProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}:</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

export default Label;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  title: {
    fontWeight: '600',
    fontSize: 12,
  },
  value: {
    fontSize: 12,
    marginLeft: 4,
  },
});
