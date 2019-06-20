import React, {useState, useEffect} from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {
    Text,
    TouchableOpacity, 
    StyleSheet,
    View
} from 'react-native';

import Modal from 'react-native-modal';
import app_styles from '../../../styles/appStyle';
import {Ionicons} from '@expo/vector-icons'

import EntryFormInput from './formInput';

/**  
 * @MARK FORM VALIDATION
 * The values returned by these functions are
 * displayed underneath the field, visible to the
 * user.
 * 
 * @required
 * checks if a field value is empty
 * 
 * @isABarcode
 * checks that the barcode field contains only
 * numbers and that is is 12 (UPC) or 13 (EAN-13)
 * digits in length
 */
const required = value => value ? undefined : "This field is required"
const isABarcode = value => {
    if ((Number(value) !== NaN) & (value.length == 12 || value.length == 13)) {
        return undefined
    }
    return "That is not a valid barcode"//
}

/**
 * @MARK MANUAL ENTRY FORM
 * this is a redux form and much
 * of the functionality is automatically supplied through
 * redux. This includes the {handleSubmit} and {onChange}
 * props
 */


const ManualEntryForm = (props) => {
    //Extract the handleSubmit prop supplied by redux-form
    const {handleSubmit} = props;
    const [modalVisible, modalVisibilityToggle] = useState(false);
    
    //Define the function that is passed to the handleSubmit prop
    const submitValues = (values) => {
        body = JSON.stringify(values);
        console.log("Inside submitValues");
        modalVisibilityToggle(!modalVisible);
        return

        
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
     
     //Render the form.
     return (
        <View style={[styles.container, {paddingTop: 30}]}>
            <Text
            style={[app_styles.app_text_bold, 
            {fontSize:20, color: "#58B34D", paddingBottom: 30, textDecorationLine: "underline"}]}>
                Enter Product Information Below
            </Text>
            <Modal isVisible={modalVisible}>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                  <View style={{alignItems: "center", justifyContent: "center", backgroundColor:"white"}}>
                      <Text style={[app_styles.app_text_bold, {padding: 20, textAlign: "center", color: "#58B34D", fontSize: 45 }]}>Submitted!</Text>
                      <Ionicons name="md-checkbox-outline" size={90} color="#CCCCCC" />
                      <TouchableOpacity
                        style={[app_styles.app_button_light, {marginTop: 30, marginBottom: 20, paddingLeft: 30, paddingRight: 30}]} 
                        onPress={() => modalVisibilityToggle(!modalVisible)}>
                        <Text style={[app_styles.app_text_bold, {fontSize: 22}]}>Ok</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            <KeyboardAwareScrollView
                extraScrollHeight={100}>
                <View style={styles.container}>
                <EntryFormInput 
                    title="Barcode Number" 
                    fieldName="barcode"
                    placeholder="Ex: 0039800079305"
                    validate={[required, isABarcode]}/>
                <EntryFormInput 
                    title="Product Name" 
                    fieldName="product_name"
                    placeholder="Dell G7 Gaming Laptop"
                    validate={[required]} />
                <EntryFormInput 
                    title="Product Category" 
                    fieldName="category"
                    placeholder="Laptop"
                    validate={[required]} />
                <EntryFormInput 
                    title="Manufacturer" 
                    fieldName="manufacturer"
                    placeholder="Dell Canada"
                    validate={[required]} />
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