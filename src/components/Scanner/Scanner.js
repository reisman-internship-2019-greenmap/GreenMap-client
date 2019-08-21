import React, {Component} from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import {BarCodeScanner} from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions';
import {withNavigation} from 'react-navigation';

//utility functions
import {headerTitle} from '../NavigationHeader/NavigationHeader'
import getProductInfo from '../../utils/networking'

//styles
import AppStyles from '../../globals/styles/AppStyle';
import ScannerStyles from './ScannerStyles';


class ScannerScreen extends Component {
    //MARK: Properties
    static navigationOptions = {
        headerTitle: headerTitle("Scanner")
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
            this.setState({onBarcodeScan: undefined});
        })
    } 

    //MARK: handlers
    _requestCameraPermission = async () => {
        const {status} = await Permissions.askAsync(Permissions.CAMERA);
        this.props.dispatch({type: "UPDATE_CAMERA_PERMISSIONS", status: (status === "granted")});
    }

    resetValidation = () => {
        this.props.dispatch({type: "RESET_CALL_TRACKER"});
        this.setState({onBarcodeScan: this._onScan}, () => {
        })
        
    }


  _onScan = (scan) => {
      this.props.dispatch({type: "UPDATE_CALL_TRACKER"});
      
      //set initial read
      if (this.props.onScanCalls == 0) {
          this.props.dispatch({type: "UPDATE_BARCODE_DATA", data:scan.data}); //
          return
      }

      //if this condition is met then the barcode is valid
      else if (this.props.onScanCalls == 5) {
        this.setState({onBarcodeScan: undefined}, () => {
            console.log("setState callback")
            //once the scanning function is shut off, talk to the server
            //DON'T FORGET TO DISPATCH SHIT
            getProductInfo(this.props.barcodeData)
            .then(doc => {
                console.log(`doc is ${doc}`)
                this.props.dispatch({type: "UPDATE_RESULT", result: doc})
            })
            .catch(error => {
                console.log("Hello I am scanner and the promise got rejected")
                this.props.dispatch({type: "RESULT_ERROR"})
            })
        
            //no matter what the response, navigate to results
            this.props.navigation.navigate("ResultsScreen");
        }) //end setState callback
        return
      } //end else if

      //else, compare the current read and the previous read
      else {
          if (scan.data != this.props.barcodeData) {
              this.props.dispatch({type:"RESET_CALL_TRACKER"});
              console.log(`Validation error`);
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
            style={[StyleSheet.absoluteFill, ScannerStyles.scannerContainer]}
            >
                <View style={[StyleSheet.absoluteFill, ScannerStyles.scannerContainer]} />
                <View style={[ScannerStyles.boundingView, ScannerStyles.topView]} />
                <View style={ScannerStyles.center}>
                    <View style={ScannerStyles.boundingView} />
                    <View style={ScannerStyles.focusBox} />
                    <View style={ScannerStyles.boundingView} />
                </View>
                <View style={[ScannerStyles.boundingView, ScannerStyles.bottom]}>
                    <TouchableOpacity style={AppStyles.appButton} onPress={this.goToForm}>
                            <Text style={[AppStyles.appTextBold, {fontSize: 18}]}>Enter Item Manually</Text>
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

