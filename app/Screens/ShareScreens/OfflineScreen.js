// NoInternetScreen.js
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

const OfflineScreen = ({ onRetry }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>No Internet Connection</Text>
      <Button title="Retry" onPress={onRetry} />
    </View>
  );
};

export default OfflineScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
});
