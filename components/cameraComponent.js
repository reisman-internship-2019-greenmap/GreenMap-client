import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import { Camera, Permissions } from 'expo';

export default class AppCamera extends React.Component {
    constructor() {
        super();
        this.state = {
            hasCameraPermission: null,
            type: Camera.Constants.Type.back,
        };
    } //end constructor
   

  //If permissions are not set, ask for permission to the user's camera
  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  //Return camera view if permission is given
  render() {
    const {hasCameraPermission} = this.state;
    if (hasCameraPermission === null) {
        return <View />;
    }

    else if (hasCameraPermission === false) {
        return (
            <View style={styles.warning}>
                <Text>You must enable camera permissions to scan a bar code</Text>
            </View>
        )}

    else {
        return (  
        <View style={styles.cameraViewContainer}>
            <Camera style={{flex:1}} type = {this.state.type}></Camera>
        </View>
            
        )} 
  } //end render
} //end AppCamera

const styles = StyleSheet.create({
    warning: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    cameraViewContainer: {
        flex: 1,
    },
}) //end styles
    