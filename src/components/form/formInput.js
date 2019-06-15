import React from 'react';
import {Text, View, TextInput, StyleSheet} from 'react-native';
import {Field} from 'redux-form';
import {Ionicons} from '@expo/vector-icons'

import app_styles from '../../../appStyle';

//Stateless functions are the best components for redux form inputs
const renderInput = (props) => {
  //
  const {input, meta, ...inputProps} = props;
  return ( <View style={{flexDirection: "column", alignItems: "flex-start"}}>
            <TextInput 
           {...inputProps}
            style={styles.input} 
            onChangeText={input.onChange}
            value={input.value}
            returnKeyType="done"
            placeholder={props.placeholder} />
              {meta.touched && meta.error ?
              <View style={{flexDirection: "row", alignItems: "center"}}> 
              <Ionicons name="md-alert" size={20} color="#E24747" />
              <Text style={styles.error}> {meta.error} </Text>
              </View> :
              <Text> </Text>}
    </View>
  )
}

//Components need to be wrapped in a Field for redux-form to work properly
const EntryFormInput = (props) => {
    return (
        <View style={{flex: 1, flexDirection: "column", justifyContent: "flex-start", margin: 6 }}>
            <Text style={[app_styles.app_text_bold, {color: '#44963A', textAlign: "left"}]}>
            {props.title}
            </Text>
            <Field
            name={props.fieldName}
            component={renderInput}
            placeholder={props.placeholder}
            validate={props.validate}
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
    },

    error: {
      fontSize: 13,
      color: "#E24747",
      fontWeight: "bold"
    }
  });