import React from 'react';
import {Text, View, TextInput, StyleSheet} from 'react-native';
import {Field} from 'redux-form';

import app_styles from '../../../appStyle';

//Stateless functions are the best components for redux form inputs
const renderInput = (props) => {
  const {input, ...inputProps} = props;
  return <TextInput 
    {...inputProps}
    style={styles.input} 
    onChangeText={input.onChange}
    value={input.value}
    returnKeyType="done"
    placeholder={props.placeholder} 
    />
  }

//Components need to be wrapped in a Field for redux-form to work properly
const EntryFormInput = (props) => {
    return (
        <View>
            <Text style={[app_styles.app_text_bold, {color: '#44963A', textAlign: "left"}]}>
            {props.title}
            </Text>
            <Field
            name={props.fieldName}
            component={renderInput}
            placeholder={props.placeholder}
            />
        </View>
    )
}

export default EntryFormInput

const styles = StyleSheet.create({
    input: {
      borderColor: '#44963A',
      width: 300,
      borderWidth: 1,
      height: 40,
      padding: 10,
      marginBottom: 20,
    }
  });