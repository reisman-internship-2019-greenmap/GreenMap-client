import React, {Component} from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {
    Text,
    TouchableOpacity, 
    View,
    TextInput
} from 'react-native';

import Modal from 'react-native-modal';
import appStyles from '../../../styles/appStyle';
import formStyles from '../../../styles/formStyles'
import styleVars from '../../../styles/styleVars';
import {Ionicons} from '@expo/vector-icons'


//MARK: init

//MARK: Handlers
class ManualEntryForm extends Component {
    //MARK: Properties
    static navigationOptions = {
        headerTitle: headerTitle("Product Form")
    }
    
    constructor(props) {
        super(props)
        this.state = {
            barcode: '',
        }
    }

    //MARK: hanlders
    updateValue = (text, field) => {
        if (field == "barcode") {
            this.setState({barcode: text})
        }
    }

    validateForm = () => {
        var errors = {}
        //check if field is not empty
        if (this.state.barcode == '') {
            errors.fieldIsEmpty = 1
            return errors
        }

        //check if barcode is a number
        if (isNaN(Number(this.state.barcode))) {
            errors.fieldIsNotANumber = 1
            return errors
        }

        //check that entry is correct length
        if (this.state.barcode.length != 12 || this.state.barcode.length != 13) {
            errors.fieldIsNotABarcode = 1
            return errors
        }
    }

    reactToValidation = () => {
        validationErrors = this.validateForm()
        errorsString = JSON.stringify(validationErrors)
        alert(errorsString)
    }
     
     //MARK: Display
     render() {
     return (
        <View style={[{padding: 30}, appStyles.centerItems, formStyles.formContainer]}>
            <Text
            style={[appStyles.appTextBold, formStyles.formHeader]}>
                Enter Product Information
            </Text>
            <Modal isVisible={false}>
                <View style={[{flex: 1 }, appStyles.centerItems]}>
                  <View style={[{backgroundColor:"white"}, appStyles.centerItems]}>
                      <Text style={[appStyles.appTextBold, formStyles.formModalTitle]}>
                          Submitted!
                        </Text>
                      <Ionicons name="md-checkbox-outline" size={90} color="#CCCCCC" />
                      <TouchableOpacity
                        style={[appStyles.appButton, formStyles.submit, {backgroundColor: styleVars.colors.light_green}]} 
                        onPress={() => alert("hi")}>
                        <Text style={[appStyles.appTextBold, {fontSize: 22}]}>
                            Ok
                        </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            <View style={{alignItems: "flex-start"}}>
            <KeyboardAwareScrollView
                extraScrollHeight={100}>
                <View style={[appStyles.centerItems, formStyles.formContainer]}>
                <Text style={[appStyles.appTextBold, formStyles.formTextInputTitle]}>Barcode</Text>
                <TextInput
                style={formStyles.formTextInput}
                placeholder="Ex: 003877698164"
                returnKeyType="done"
                onChangeText={(text) => this.updateValue(text, "barcode")}/>
                <TouchableOpacity
                style={[appStyles.appButton, formStyles.submit]} 
                onPress={this.reactToValidation}>
                    <Text style={[appStyles.appTextBold, {fontSize: 20}]}>Submit</Text>
                </TouchableOpacity>
                </View>
            </KeyboardAwareScrollView>
        </View>
        </View>
    )
}}


export default ManualEntryForm