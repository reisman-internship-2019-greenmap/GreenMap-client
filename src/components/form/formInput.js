import React from 'react';
import {Text, View, TextInput, StyleSheet} from 'react-native';
import {Field, reduxForm} from 'redux-form';

const renderInput = ({ input: { onChange, ...restInput }}) => {
    return <TextInput style={styles.input} onChangeText={onChange} {...restInput} />
  }

const EntryFormInput = (props) => {
    return (
        <View>
            <Text>{props.text}</Text>
            <TextInput style={styles.input} />
        </View>
    )
}

export default EntryFormInput

const styles = StyleSheet.create({
    input: {
      borderColor: 'gray',
      width: 300,
      borderWidth: 1,
      height: 40,
      padding: 10,
      marginBottom: 20,
    }
  });