import React, {Component} from 'react';
import {StyleSheet, View, Text, Dimensions} from 'react-native';
import { Permissions, BarCodeScanner, Font } from 'expo';
import GreenmapButton from './greenmapButton';

export default class Scanner extends Component {
    constructor() {
        super();
        this.state = {
            hasCameraPermission: null,
            barCodeData: null,
            fontLoaded: false,
            type: BarCodeScanner.Constants.Type.back,
            url: 'URL-that-the-express-server-is-running-on',
        };
    } 
   

  //If permissions are not set, ask for permission to the user's camera
  //wait for fonts to load and reflect loading in the state
  async componentDidMount() {
    this._requestCameraPermission();
    await Font.loadAsync({
        'raleway-extra-bold': require('../assets/Raleway-ExtraBold.ttf')
    });
    this.setState({fontLoaded: true});
  }

  //ask for camera permission and reflect the answer in the state
  _requestCameraPermission = async () => {
    const {status} = Permissions.askAsync(Permissions.CAMERA);
    this.setState({hasCameraPermission: status === "granted"});
  }

//helper function for controlling repetative _onScan() calls
_delay = (time) => {
    return new Promise ((resolve, reject) => {
        setTimeout(() => resolve(), time);
    })
}

/*Called (repeatidly) when a barcode is detected. If the 
scanner detects the same code as it did 1/2 a second ago, no
action is performed. Otherwise the data is processed*/
  _onScan = async scan => {
    await this._delay(500);
    if (this.state.barCodeData == scan.data) return;
    this.setState({barCodeData: scan.data});

    //display loading animation

    /*fetch(this.state.url + 'string of barcode data')
        .then(navigate to results page)
    */
        
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
                <View style={[styles.opaqueEdge, styles.bottom]} />
                {
                    this.state.fontLoaded ? (
                        <GreenmapButton buttonStyles={styles.button}
                        text="Enter item manually"
                        textStyles={styles.text} 
                        onPress={()=> alert("You pressed the button!")}
                    />
                    ) : null
                }
            </BarCodeScanner>
            }
        </View>
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

    button: {
        padding: 10,
        borderRadius: 5,
        backgroundColor: "#58B34D",
        position: 'absolute',
        left: deviceWidth/4,
        bottom: deviceHeight/10,
    },

    text: {
        fontFamily: 'raleway-extra-bold',
        fontSize: 20,
        color: '#ffffff',
        textAlign: 'center'
    },
})