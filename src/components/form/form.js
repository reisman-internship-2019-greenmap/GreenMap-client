import React, {useState} from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {
    Text,
    TouchableOpacity, 
    View
} from 'react-native';

import Modal from 'react-native-modal';
import appStyles from '../../../styles/appStyle';
import formStyles from '../../../styles/formStyles'
import styleVars from '../../../styles/styleVars';
import {Ionicons} from '@expo/vector-icons'

import EntryFormInput from './formInput';

/**
 * @overview
 * Most of this code base is class-based, but the
 * redux form we implement works with functional
 * components. This file's organization is therefore a
 * little different from the other components, but still
 * follows the same logical pattern
 */

//MARK: init

//MARK: Handlers
const required = value => value ? undefined : "This field is required"
const isABarcode = value => {
    if ((Number(value) !== NaN) & (value.length == 12 || value.length == 13)) {
        return undefined
    }
    return "That is not a valid barcode"//
}

//MARK: display (plus additional set-up)
const ManualEntryForm = (props) => {
    
    //MARK: properties
    const {handleSubmit} = props;
    const [modalVisible, modalVisibilityToggle] = useState(false);
    
    //MARK: Handlers
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
     
     //MARK: Display
     return (
        <View style={[{padding: 30}, appStyles.centerItems, formStyles.formContainer]}>
            <Text
            style={[appStyles.appTextBold, formStyles.formHeader]}>
                Enter Product Information Below
            </Text>
            <Modal isVisible={modalVisible}>
                <View style={[{flex: 1 }, appStyles.centerItems]}>
                  <View style={[{backgroundColor:"white"}, appStyles.centerItems]}>
                      <Text style={[appStyles.appTextBold, formStyles.formModalTitle]}>
                          Submitted!
                        </Text>
                      <Ionicons name="md-checkbox-outline" size={90} color="#CCCCCC" />
                      <TouchableOpacity
                        style={[appStyles.appButton, formStyles.submit, {backgroundColor: styleVars.colors.light_green}]} 
                        onPress={() => modalVisibilityToggle(!modalVisible)}>
                        <Text style={[appStyles.appTextBold, {fontSize: 22}]}>
                            Ok
                        </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            <KeyboardAwareScrollView
                extraScrollHeight={100}>
                <View style={[appStyles.centerItems, formStyles.formContainer]}>
                <EntryFormInput 
                    title="Barcode Number" 
                    fieldName="barcode"
                    placeholder="Ex: 0039800079305"
                    validate={[required, isABarcode]}/>
                <TouchableOpacity
                style={[appStyles.appButton, formStyles.submit]} 
                onPress={handleSubmit(submitValues)}>
                    <Text style={[appStyles.appTextBold, {fontSize: 22}]}>Submit</Text>
                </TouchableOpacity>
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}//


export default ManualEntryForm