import React, {Component} from 'react';
import { View, Text } from 'react-native';
import { Permissions, Font,} from 'expo';
import ScannerScreen from './scannerScreen';


export default class ScannerController extends Component {
    constructor() {
        super();
        this.state = {
            hasCameraPermission: null,
            barCodeData: null,
            fontLoaded: false,
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
    console.log("Hello from app!") //testing logging
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

    //TODO - get url for the actual server and send data in the request
    fetch('http://example.com/movies.json')
        .then(() => console.log('GET request was made'))
        .catch((error) => console.log(error))
        
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
            <ScannerScreen
            onScan={this._onScan}
            isFontLoaded={this.state.fontLoaded} />
            }
        </View>
    )} //end render
} //end Scanner