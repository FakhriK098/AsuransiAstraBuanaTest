import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { StatProps } from '../../../types/detail';
import { Stat as IStat } from '../../../types/pokemon';
import { colors } from '../../../themes/colors';

const Stat = ({ stats, color, isLight }: StatProps) => {
  const renderItem = ({ item, index }: { item: IStat; index: number }) => {
    return (
      <View
        key={`stat-${index}-${item.stat.name}`}
        style={styles.cardContainer}
      >
        <View style={[styles.baseStatContainer, { backgroundColor: color }]}>
          <Text
            style={[
              styles.baseText,
              { color: isLight ? colors.white : colors.black },
            ]}
          >
            {item.base_stat}
          </Text>
        </View>
        <View
          style={[
            styles.baseStatValueContainer,
            { backgroundColor: isLight ? colors.white : colors.black },
          ]}
        >
          <Text
            style={[
              styles.baseValueText,
              { color: !isLight ? colors.white : colors.black },
            ]}
          >
            {item.stat.name.replace('-', ' ')}
          </Text>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        key={`stat`}
        data={stats}
        renderItem={renderItem}
        keyExtractor={(item, index) => `stat-${index}-${item.stat.name}`}
        numColumns={3}
        scrollEnabled={false}
      />
    </View>
  );
};

export default Stat;

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
  cardContainer: {
    borderRadius: 8,
    padding: 8,
    elevation: 8,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    flex: 1 / 2,
  },
  baseStatContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  baseText: {
    fontSize: 24,
    fontWeight: '600',
  },
  baseStatValueContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 4,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  baseValueText: {
    fontSize: 10,
    fontWeight: '400',
    textTransform: 'capitalize',
  },
});
