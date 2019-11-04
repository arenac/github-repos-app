import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import './config/ReactotronConfig';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff',
  },
  greetings: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

console.tron.warn();
('test');

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.greetings}>Hello World!</Text>
      <Text style={styles.greetings}>Hello World!</Text>
    </View>
  );
}
