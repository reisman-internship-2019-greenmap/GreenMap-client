import React, {Component} from 'react';
import {StyleSheet, View, Text, Dimensions} from 'react-native';
import { Permissions, BarCodeScanner } from 'expo';

export default class Scanner extends Component {
    constructor() {
        super();
        this.state = {
            hasCameraPermission: null,
            type: BarCodeScanner.Constants.Type.back,
        };
    } //end constructor
   

  //If permissions are not set, ask for permission to the user's camera
  componentDidMount() {
    this._requestCameraPermission();
  }

  _requestCameraPermission = async () => {
    const {status} = Permissions.askAsync(Permissions.CAMERA);
    this.setState({hasCameraPermission: status === "granted"});
  }

  _onScan = ({type, data}) => {
      alert(`Barcode type: ${type}. Barcode data: ${data}.`);
  }

  //Return camera view with scanner implemented if permission is given
  render() {
     return (
        <View style={styles.container}>
            {this.state.hasCameraPermission === null?
                <Text>Requesting camera access</Text>:
            this.state.hasCameraPermissionn === false?
                <Text>You must enable camera access to scan a barcode</Text>:
            <BarCodeScanner
            onBarCodeScanned={this._onScan}
            style={styles.scanner}
            />
            }
        </View>
    )} //end render
} //end Scanner

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    scanner: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
    }
}) //end styles