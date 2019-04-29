import { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class App extends Component {

  render() {
      return (
      <View style={styles.container}>
        <Text>Hello world!</Text>
      </View>
    )} //end render
} //end App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  dummyText: {
    textAlign: 'center',
  }
});
