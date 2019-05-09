import React, {Component} from 'react';
import {StyleSheet, View, Text,} from 'react-native';
import { Permissions, BarCodeScanner } from 'expo';

export default class Scanner extends Component {
    constructor() {
        super();
        this.state = {
            hasCameraPermission: null,
            barCodeData: null,
            type: BarCodeScanner.Constants.Type.back,
        };
    } 
   

  //If permissions are not set, ask for permission to the user's camera
  componentDidMount() {
    this._requestCameraPermission();
  }

  _requestCameraPermission = async () => {
    const {status} = Permissions.askAsync(Permissions.CAMERA);
    this.setState({hasCameraPermission: status === "granted"});
  }


_delay = (time) => {
    return new Promise ((resolve, reject) => {
        setTimeout(() => resolve(), time);
    })
}

/*Called when a barcode is detected. Note it's called EVERY
time a detection occurs, not just once per barcode, hence the
delay*/
  _onScan = async scan => {
    await this._delay(500);
    if (this.state.barCodeData == scan.data) return;
    this.setState({barCodeData: scan.data});
    alert(`${this.state.barCodeData}`);
  }

  //Return camera view with scanner implemented if permission is given
  render() {
     return (
        <View style={{flex:1}}>
            {this.state.hasCameraPermission === null?
                <Text>Requesting camera access</Text>:
            this.state.hasCameraPermissionn === false?
                <Text>You must enable camera access to scan a barcode</Text>:
            <BarCodeScanner
            onBarCodeScanned={this._onScan}
            style={[StyleSheet.absoluteFill, styles.container]}
            >
                <View style={[StyleSheet.absoluteFill, styles.container]} />
                <View style={styles.opaqueEdge} />
                <View style={styles.center}>
                    <View style={styles.opaqueEdge} />
                    <View style={styles.focused} />
                    <View style={styles.opaqueEdge} />
                </View>
                <View style={styles.opaqueEdge} />
            </BarCodeScanner>
            }
        </View>
    )} //end render
} //end Scanner

const opacity = 'rgba(0, 0, 0, .6)';
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

    focused: {
        flex: 10,   
    },
}) //end styles