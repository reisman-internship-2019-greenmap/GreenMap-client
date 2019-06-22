import React from 'react';
import {Text, View, TextInput, StyleSheet} from 'react-native';
import {Field} from 'redux-form';
import {Ionicons} from '@expo/vector-icons'

import appStyles from '../../../styles/appStyle';
import formStyles from '../../../styles/formStyles';

//Stateless functions are the best components for redux form inputs
const renderInput = (props) => {
  //
  const {input, meta, ...inputProps} = props;
  return ( <View style={{flexDirection: "column", alignItems: "flex-start"}}>
            <TextInput 
           {...inputProps}
            style={formStyles.formTextInput} 
            onChangeText={input.onChange}
            value={input.value}
            returnKeyType="done"
            placeholder={props.placeholder} />
              {meta.touched && meta.error ?
              <View style={{flexDirection: "row", alignItems: "center"}}> 
              <Ionicons name="md-alert" size={20} color="#E24747" />
              <Text style={formStyles.inputError}> {meta.error} </Text>
              </View> :
              <Text> </Text>}
    </View>
  )
}

//Components need to be wrapped in a Field for redux-form to work properly
const EntryFormInput = (props) => {
    return (
        <View style={formStyles.formInputContainer}>
            <Text style={[appStyles.appTextBold, {color: '#44963A', textAlign: "left", fontSize: 20}]}>
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