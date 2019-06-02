import React, {Component} from 'react';
import {StyleSheet, View, Dimensions, TouchableOpacity, Text} from 'react-native';
import { BarCodeScanner, Font, Permissions } from 'expo';
import {withNavigation} from 'react-navigation';

import app_styles from '../../appStyle';


class ScannerScreen extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            fontsLoaded: false,
            onBarcodeScan: this._onScan,
        }

    }
    //TODO: Factor in camera permissions
    async componentDidMount() {
        this._requestCameraPermission();
        await Font.loadAsync({
            "Raleway-Extra-Bold": require("../../assets/Raleway-ExtraBold.ttf")
        });
        this.setState({fontsLoaded : true});
        this.listener = this.props.navigation.addListener("willFocus", () => {
            this.resetValidation();
        })
    } 

    _requestCameraPermission = async () => {
        const {status} = await Permissions.askAsync(Permissions.CAMERA);
        this.props.dispatch({type: "UPDATE_CAMERA_PERMISSIONS", status: (status === "granted")});
        console.log(this.props.permissions);
    }

    resetValidation = () => {
        this.props.dispatch({type: "RESET_CALL_TRACKER"});
        this.setState({onBarcodeScan: this._onScan}, () => {
            console.log(`The scanner was reset`);
        })
        
    }


  _onScan = (scan) => {
      console.log(`scan calls: ${this.props.onScanCalls}`);
      this.props.dispatch({type: "UPDATE_CALL_TRACKER"});
      
      //set initial read
      if (this.props.onScanCalls == 0) {
          this.props.dispatch({type: "UPDATE_BARCODE_DATA", data:scan.data}); //
          return
      }

      //if this condition is met then the barcode is valid
      else if (this.props.onScanCalls == 5) {
        this.setState({onBarcodeScan: undefined}, () => {
                //once the scanning function is shut off, talk to the server
                fetch(`https://greenmap.herokuapp.com/${this.props.barcodeData}`)
                .then((res) => res.json())
                .catch(error => console.log('Error: ', error))
                .then((resJSON) => {
                    if (!resJSON.doc) {
                        this.props.dispatch({type: "RESULT_ERROR"});
                    }
                    else {
                        console.log('in else block in scanner.js');
                        this.props.dispatch({type: "UPDATE_RESULT", result: resJSON.doc});
                    }
                }) //end server communication
            this.props.navigation.navigate("ResultsScreen");
            }) //end setState callback
        return
      } //end else if

      //else, compare the current read and the previous read
      else {
          if (scan.data != this.props.barcodeData) {
              this.props.dispatch({type:"RESET_CALL_TRACKER"});
              console.log(`Validation error, onScanCalls is ${this.props.onScanCalls}`);
              return
          }
      }
      
      console.log(`barcodeData: ${this.props.barcodeData}`);
}
    
  goToForm = () => {
      this.props.navigation.navigate("FormScreen");
  }

  //TODO: turn the TouchableOpacity and text into the original GreenmapButton
  render() {
    if (this.props.permissions) {
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
     )} //end if

     else {
         return (
            <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
                <Text style={{fontSize: 20, textAlign: "center"}}>You must enable camera access</Text>
            </View>
         )
     }
}} //end Scanner

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