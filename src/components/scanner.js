import React, {Component} from 'react';
import {StyleSheet, View, Dimensions, TouchableOpacity, Text} from 'react-native';
import { BarCodeScanner, Font } from 'expo';

import app_styles from '../../appStyle';

export default class ScannerScreen extends Component {
    state = {
        barcodeData: null,
        fontsLoaded: false
    }

    async componentDidMount() {
        await Font.loadAsync({
            "Raleway-Extra-Bold": require("../../assets/Raleway-ExtraBold.ttf")
        });
        this.setState({fontsLoaded : true});
    }

  onScan = (scan) => {
    if (scan.data == this.state.barcodeData) return;
    this.setState({barcodeData: scan.data}, 
        () => {
            this.props.dispatch({type: "UPDATE_BARCODE_DATA"});
            this.props.dispatch({type: "LOADING_RESULTS"});
        })

    //returns some dummy JSON
    fetch("https://facebook.github.io/react-native/movies.json")
    .then((res) => res.json())
    .then((resJSON) => {
        switch (resJSON.title) {
            case "The Basics - Networking":
                this.props.dispatch({type:"RENDER_WIKIMISS_SCREEN"});
                console.log("line after dispatch in barcodeScanner");
                break;
            case "barcode missed":
                this.props.dispatch({type:"RENDER_BARCODEMISS_SCREEN"});
                break;
            default:
                //pass
        }
    })
    .catch((error) => console.log(error))

    this.props.navigation.navigate("ResultsScreen");
  }

  goToForm = () => {
      alert("You pressed me!")
  }

  //turn the TouchableOpacity and text into the original GreenmapButton
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
                    <TouchableOpacity style={[app_styles.app_button_light, styles.scanner_button]} onPress={this.goToForm}>
                        {this.state.fontsLoaded ? 
                            <Text style={[app_styles.app_text_bold, {fontSize: 18}]}>Enter Item Manually</Text>:
                            <Text>Enter Item Manually</Text>}
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
    },
})