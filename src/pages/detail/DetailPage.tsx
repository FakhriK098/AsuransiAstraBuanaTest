import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React from 'react';

const DetailPage = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>DetailPage</Text>
      </View>
    </SafeAreaView>
  );
};

export default DetailPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
