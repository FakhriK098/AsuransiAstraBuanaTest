import { StyleSheet, Text, View } from 'react-native';
import React, { useMemo } from 'react';
import { colors } from '../../../themes/colors';
import { TypeProps } from '../../../types/home';

const Type = ({ text, isLight, backgroundColor, fontSize }: TypeProps) => {
  const tempBackgroundColor = useMemo(() => {
    if (backgroundColor) {
      return backgroundColor;
    }
    return isLight ? colors.black : colors.white;
  }, [isLight, backgroundColor]);

  return (
    <View style={[styles.containter, { backgroundColor: tempBackgroundColor }]}>
      <Text
        style={[
          styles.text,
          {
            color: isLight ? colors.white : colors.black,
            fontSize: fontSize || 8,
          },
        ]}
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
    textTransform: 'capitalize',
  },
});
