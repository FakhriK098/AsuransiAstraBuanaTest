import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { colors } from '../themes/colors';
import { FloatingCompareProps } from '../types/home';

const FloatingCompare = ({ onPress }: FloatingCompareProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.fab}
        onPress={onPress}
        activeOpacity={0.8}
      >
        <Text style={styles.text}>Compare Pokemon</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FloatingCompare;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: Platform.select({ ios: 48, android: 20 }),
    right: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fab: {
    borderRadius: 28,
    width: 200,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    padding: 8,
  },
  text: {
    fontSize: 16,
    color: colors.black,
  },
});
