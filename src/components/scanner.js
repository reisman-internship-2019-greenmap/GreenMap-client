import React, {Component} from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import {BarCodeScanner} from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions';
import {withNavigation} from 'react-navigation';

import customNavBar from '../../utils/CustomNavBar'

import appStyles from '../../styles/appStyle';
import scannerStyles from '../../styles/scannerStyles';


class ScannerScreen extends Component {
    //MARK: Properties
    static navigationOptions = {
            headerTitle: customNavBar("Scanner"),
            headerStyle: appStyles.headerStyle
    }
    
    //MARK: init
    constructor(props){
        super(props);
        
        this.state = {
            onBarcodeScan: this._onScan,
        }

    }
    
    async componentDidMount() {
        this._requestCameraPermission();
        this.focusListener = this.props.navigation.addListener("willFocus", () => {
            this.resetValidation();
        })
        this.blurListener = this.props.navigation.addListener("didBlur", () => {
            this.setState({onBarcodeScan: undefined}, () => console.log("blurListener fired"));
        })
    } 

    //MARK: handlers
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

  //MARK: display
  render() {
    if (this.props.permissions) {
     return (
            <BarCodeScanner
            onBarCodeScanned={this.state.onBarcodeScan}
            style={[StyleSheet.absoluteFill, scannerStyles.scannerContainer]}
            >
                <View style={[StyleSheet.absoluteFill, scannerStyles.scannerContainer]} />
                <View style={[scannerStyles.boundingView, scannerStyles.topView]} />
                <View style={scannerStyles.center}>
                    <View style={scannerStyles.boundingView} />
                    <View style={scannerStyles.focusBox} />
                    <View style={scannerStyles.boundingView} />
                </View>
                <View style={[scannerStyles.boundingView, scannerStyles.bottom]}>
                    <TouchableOpacity style={appStyles.appButton} onPress={this.goToForm}>
                            <Text style={[appStyles.appTextBold, {fontSize: 18}]}>Enter Item Manually</Text>
                    </TouchableOpacity>
                </View>
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

