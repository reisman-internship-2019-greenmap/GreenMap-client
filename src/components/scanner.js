import React, {Component} from 'react';
import {StyleSheet, View, Dimensions, TouchableOpacity, Text} from 'react-native';
import { BarCodeScanner, Font } from 'expo';
import {withNavigation} from 'react-navigation';

import app_styles from '../../appStyle';


class ScannerScreen extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            barcodeData: null,
            fontsLoaded: false,
            onBarcodeScan: this._onScan,
        }

    }

    async componentDidMount() {
        await Font.loadAsync({
            "Raleway-Extra-Bold": require("../../assets/Raleway-ExtraBold.ttf")
        });
        this.setState({fontsLoaded : true});
        this.listener = this.props.navigation.addListener("didFocus", () => {
            this.resetValidation();
        })
    }

    resetValidation = () => {
        this.setState({stateScanCalls: 0})
        console.log("Reset validation was called");
    }

  _onScan = (scan) => {
      this.props.dispatch({type: "UPDATE_CALL_TRACKER"});
      console.log(this.props.onScanCalls);

      if (this.props.onScanCalls == 5) {
        this.setState({onBarcodeScan: undefined}, () => this.props.navigation.navigate("ResultsScreen"))
      }
}
    
  goToForm = () => {
      alert("You pressed me!")
  }

  //turn the TouchableOpacity and text into the original GreenmapButton
  render() {
     return (
            <BarCodeScanner
            onBarCodeScanned={this.state.onBarcodeScan}
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

export default withNavigation(ScannerScreen);

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