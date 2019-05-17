import React, {Component} from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import { BarCodeScanner } from 'expo';

import GreenmapButton from '../greenmapButton';
import PropTypes from 'prop-types';

import app_styles from '../../appStyle';

export default class ScannerScreen extends Component {
    static propTypes = {
        onScan: PropTypes.func.isRequired,
        isFontLoaded: PropTypes.bool.isRequired,
        onFormButtonPress: PropTypes.func.isRequired,
    }

  render() {
      const {onScan, isFontLoaded} = this.props;
     return (
            <BarCodeScanner
            onBarCodeScanned={onScan}
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
                    isFontLoaded ? (
                        <GreenmapButton buttonStyles={[
                            app_styles.app_button_light,styles.scanner_button
                        ]}
                        text="Enter item manually"
                        textStyles={app_styles.app_text_bold} 
                        onPress={this.props.onFormButtonPress}
                    />
                    ) : null
                }
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