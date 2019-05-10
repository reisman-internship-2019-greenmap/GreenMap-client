import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity, Text,} from 'react-native';

export default class GreenmapButton extends Component {
    static propTypes = {
        text: PropTypes.string.isRequired,
        onPress: PropTypes.func.isRequired,
        textStyles: PropTypes.oneOfType([
            PropTypes.array,
            PropTypes.number,
            PropTypes.shape({}),
        ]).isRequired,
        buttonStyles: PropTypes.oneOfType([
            PropTypes.array,
            PropTypes.number,
            PropTypes.shape({}),
        ]).isRequired,
    }

    render() {
        const {text, onPress, textStyles, buttonStyles} = this.props;

        return (
            <TouchableOpacity style={buttonStyles}
            onPress={() => onPress()}>
                <Text style={textStyles}>{text}</Text>
            
            </TouchableOpacity>
        )
    }
}