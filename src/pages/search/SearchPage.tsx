import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React from 'react';

const SearchPage = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>SearchPage</Text>
      </View>
    </SafeAreaView>
  );
};

export default SearchPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
