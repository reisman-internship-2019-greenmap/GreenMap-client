import React, {Component} from 'react';
import { View, Text, StyleSheet } from 'react-native';

class ResultSuccess extends Component {
    render() {
        return (
        <View style={styles.container}>
            <Text style={styles.text}>Hello Results Screen!</Text>
        </View>
    )}
}

class WikiDidMiss extends Component {
    render() {
        return (
        <View style={styles.container}>
            <Text style={styles.text}>Hello wikiMiss Screen!</Text>
        </View>
    )}
}


class BarcodeDidMiss extends Component {
    render() {
        return (
        <View style={styles.container}>
            <Text style={styles.text}>Hello barcodeMiss Screen!</Text>
        </View>
    )}
}

export default class ResultsView extends Component {
    render() {
        return(
        <ResultSuccess />
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