import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React from 'react';

const ComparePage = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>ComparePage</Text>
      </View>
    </SafeAreaView>
  );
};

export default ComparePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
