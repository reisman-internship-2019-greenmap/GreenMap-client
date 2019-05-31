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

export default class ResultsView extends Component {

    render() {
        return (
            <View style={{flex:1}}>
                {this.props.resultDoc ? <ResultSuccess result={this.props.resultDoc}/> :
            <Text style={styles.text}>Loading Results</Text>}
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