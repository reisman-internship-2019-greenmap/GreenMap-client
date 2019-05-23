import React, {Component} from 'react';
import {StyleSheet, View, Dimensions, TouchableOpacity, Text} from 'react-native';
import { BarCodeScanner } from 'expo';

export default class ScannerScreen extends Component {
    state = {
        barcodeData: null
    }

  onScan = (scan) => {
    if (scan.data == this.state.barcodeData) return;
    this.setState({barcodeData: scan.data}, 
        () => {
            this.props.dispatch({type: "UPDATE_BARCODE_DATA"});
            this.props.dispatch({type: "LOADING_RESULTS"});
        })

    fetch("https://facebook.github.io/react-native/movies.json")
    .then((res) => res.json())
    .then((resJSON) => console.log(resJSON.title))
    .catch((error) => console.log(error))
    
    this.props.navigation.navigate("ResultsScreen");
  }

  goToForm = () => {
      alert("You pressed me!")
  }

  render() {
     return (
            <BarCodeScanner
            onBarCodeScanned={this.onScan}
            style={[StyleSheet.absoluteFill, styles.container]}
            >
                <View style={[StyleSheet.absoluteFill, styles.container]} />
                <View style={styles.opaqueEdge} />
                <View style={styles.center}>
                    <View style={styles.opaqueEdge} />
                    <View style={styles.focused} />
                    <View style={styles.opaqueEdge} />
                </View>
                <View style={[styles.opaqueEdge, styles.bottom]} />
                    <TouchableOpacity style={styles.scanner_button} onPress={this.goToForm}>
                        <Text>{this.props.barcodeData}</Text>
                    </TouchableOpacity>
            </BarCodeScanner>
    )} //end render
} //end Scanner

//define consts used in the StyleSheet
const opacity = 'rgba(0, 0, 0, .6)';
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },

    opaqueEdge: {
        flex: 1,
        backgroundColor: opacity,
    },

    center: {
        flex: 1, 
        flexDirection: 'row',
    },

    bottom: {
        backgroundColor: opacity,
    },

    focused: {
        flex: 10,   
    },

    scanner_button: {
        position: 'absolute',
        left: deviceWidth/4,
        bottom: deviceHeight/10,
        padding: 10,
        backgroundColor: "green",
    },
})