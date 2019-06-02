import React, {Component} from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {
    Text,
    TouchableOpacity, 
    StyleSheet,
    View
} from 'react-native'; 

import app_styles from '../../../appStyle';

import EntryFormInput from './formInput';

const ManualEntryForm = (props) => {
   const {handleSubmit} = props;
    
    const submitValues = (values) => {
        console.log('submitting form', values)
      }
        return (
            <KeyboardAwareScrollView
                extraScrollHeight={100}>
                <View style={styles.container}>
                <EntryFormInput text="Barcode Number" name="barcodeField"/>
                <EntryFormInput text="Product Name" name="productNameField" />
                <EntryFormInput text="Manufacturer" name="manufacturerField" />
                <EntryFormInput text="ESG Score" name="ESGField" />
                <TouchableOpacity
                style={[app_styles.app_button_light, {marginTop: 30}]} 
                onPress={handleSubmit(submitValues)}>
                    <Text style={app_styles.app_text_bold}>Submit</Text>
                </TouchableOpacity>
                </View>
            </KeyboardAwareScrollView>
        )
}

const styles= StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 100,
    }
})


export default ManualEntryForm