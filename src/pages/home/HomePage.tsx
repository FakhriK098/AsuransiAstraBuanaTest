import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React from 'react';

const HomePage = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>HomePage</Text>
      </View>
    </SafeAreaView>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
