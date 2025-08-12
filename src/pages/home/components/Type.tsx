import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { colors } from '../../../themes/colors';
import { TypeProps } from '../../../types/home';

const Type = ({ text, isLight }: TypeProps) => {
  return (
    <View
      style={[
        styles.containter,
        { backgroundColor: isLight ? colors.black : colors.white },
      ]}
    >
      <Text
        style={[styles.text, { color: isLight ? colors.white : colors.black }]}
      >
        {text}
      </Text>
    </View>
  );
};

export default Type;

const styles = StyleSheet.create({
  containter: {
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 5,
    alignSelf: 'baseline',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
    marginEnd: 4,
    elevation: 10,
  },
  text: {
    fontSize: 8,
    textTransform: 'capitalize',
  },
});
