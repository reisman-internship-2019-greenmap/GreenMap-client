import React, {Component} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {PropTypes} from 'prop-types';

class ResultSuccess extends Component {
    static propTypes = {
        result: PropTypes.object.isRequired
    }

    render() {
        return (
        <View style={styles.container}>
            <Text style={styles.text}>{this.props.result.name}</Text>
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
        return (
            <View style={{flex:1}}>
                {this.props.didWikiMiss ? <WikiDidMiss /> :
                 this.props.didBarcodeMiss ? <BarcodeDidMiss />:
                <ResultSuccess result={this.props.resultDoc} />}
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