import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {
    Text,
    TouchableOpacity, 
    StyleSheet,
    View
} from 'react-native'; 

import app_styles from '../../../appStyle';

import EntryFormInput from './formInput';

/*It is easier to use functions rather than classes 
for redux-form construction*/
const ManualEntryForm = (props) => {
    //Extract the handleSubmit prop supplied by redux-form
    const {handleSubmit} = props;
    
    //Define the function that is passed to the handleSubmit prop
    const submitValues = (values) => {
        body = JSON.stringify(values);
        console.log(body);
        /*fetch('192.168.1.169:/3000', {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: values
        })
        .then(res => res.json())
        .catch(error => console.log("ERROR: ", error))
        .then(resJSON => console.log(resJSON)) */
      }
     
     //Render the form
     return (
        <View style={[styles.container, {paddingTop: 30}]}>
            <Text
            style={[app_styles.app_text_bold, 
            {fontSize:20, color: "#58B34D", paddingBottom: 30, textDecorationLine: "underline"}]}>
                Enter Product Information Below
            </Text>
            <KeyboardAwareScrollView
                extraScrollHeight={100}>
                <View style={[styles.container, {marginTop: 10}]}>
                <EntryFormInput 
                    title="Barcode Number" 
                    fieldName="barcode"
                    placeholder="Ex: 0039800079305"/>
                <EntryFormInput 
                    title="Product Name" 
                    fieldName="product_name"
                    placeholder="Dell G7 Gaming Laptop" />
                <EntryFormInput 
                    title="Product Category" 
                    fieldName="category"
                    placeholder="Laptop" />
                <EntryFormInput 
                    title="Manufacturer" 
                    fieldName="manufacturer"
                    placeholder="Dell Canada" />
                <EntryFormInput 
                    title="ESG Score" 
                    fieldName="ESG"
                    placeholder="4.2" />
                <TouchableOpacity
                style={[app_styles.app_button_light, {marginTop: 30, paddingLeft: 20, paddingRight: 20}]} 
                onPress={handleSubmit(submitValues)}>
                    <Text style={[app_styles.app_text_bold, {fontSize: 22}]}>Submit</Text>
                </TouchableOpacity>
                </View>
            </KeyboardAwareScrollView>
        </View>
        )
}

const styles= StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: '#F6F6F6'
    }
})


export default ManualEntryForm