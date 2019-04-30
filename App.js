import React, { Component } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Swiper from 'react-native-swiper';
import CameraComponent from './components/cameraComponent';

//TODO: Replace "Hello Swiper" with a main screen menu-like component
//react-native-swiper Github page: https://github.com/leecade/react-native-swiper
export default class App extends Component {
  render() {
      return (
        <Swiper showsButtons={true}>
          <View style={styles.helloSwiper}>
            <Text style={styles.text}>Hello Swiper</Text>
          </View>
          <CameraComponent />
        </Swiper>
    )} //end render
} //end App

const styles = StyleSheet.create({
  helloSwiper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },

  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  }
})


