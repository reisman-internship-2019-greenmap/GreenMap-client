import React, {Component} from 'react';
import { View, StyleSheet } from 'react-native';

import GreenmapButton from '../greenmapButton';

import app_styles from '../../appStyle';

export default class ResultScreen extends Component {
    render() {
        return (
        <View style={styles.container}>
            <GreenmapButton buttonStyles={[
                app_styles.app_button_light, styles.submit
            ]}
            text="Submit"
            textStyles={[app_styles.app_text_bold, {fontSize:24}]}
            onPress={() => alert("You pressed submit!")} />
        </View>
    )}
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    text: {
        fontSize: 20,
        textAlign: 'center',
    }
})