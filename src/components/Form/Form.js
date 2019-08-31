import React, {Component} from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {
    Text,
    TouchableOpacity, 
    View,
    TextInput
} from 'react-native';


import AppStyles from '../../globals/styles/AppStyle';
import FormStyles from './FormStyles';

import {Ionicons} from '@expo/vector-icons'
import getProductInfo from '../../utils/networking';



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
            barcodeValue: '',
            barcodeError: null
        }
    }

    //MARK: hanlders //
    updateValue = (text, field) => {
        if (field == "barcode") {
            this.setState({barcodeValue: text})
        }
    }

    validateForm = () => {
        var error;
        if (this.state.barcodeValue == '') { 
            error = "This field is required"
        }
        else if (isNaN(Number(this.state.barcodeValue))) {
            error = "The barcode must be a number"
        }

        else if (this.state.barcodeValue.length < 12 | this.state.barcodeValue.length > 13) {
            error = "That is not a valid barcode"
        }
       
        this.setState({barcodeError: error}, () => {
            console.log(`The error is: ${this.state.barcodeError}`)
            if (this.state.barcodeError == null) {
                getProductInfo(this.state.barcodeValue)
                .then(doc => {
                    console.log(`doc is ${JSON.stringify(doc)}`)
                    this.props.dispatch({type: "UPDATE_RESULT", result: doc})
                    this.props.navigation.navigate("ResultsScreen");
                }
                )
                .catch(err => {
                    console.log(`Error! ${err}`);
                    this.props.dispatch({type: "RESULT_FAILURE"})
                    this.props.navigation.navigate("ResultsScreen");
                }) 
             //end server communication
            }
        })
    }
     
     //MARK: Display
     render() {
     return (
        <View style={[{padding: 30}, AppStyles.centerItems, FormStyles.formContainer]}>
            <Text
            style={[AppStyles.appTextBold, FormStyles.formHeader]}>
                Enter Product Information
            </Text>
            <View style={{alignItems: "flex-start"}}>
            <KeyboardAwareScrollView
                extraScrollHeight={100}>
                <View style={[AppStyles.centerItems, FormStyles.formContainer]}>
                <Text style={[AppStyles.appTextBold, FormStyles.formTextInputTitle]}>
                    Barcode
                </Text>
                <TextInput
                style={FormStyles.formTextInput}
                placeholder="Ex: 003877698164"
                returnKeyType="done"
                onChangeText={(text) => this.updateValue(text, "barcode")}/>
                <View style={{flexDirection: "row", alignSelf: 'flex-start', alignItems: 'center', marginTop: 5, 
            opacity: this.state.barcodeError ? 100 : 0}}>
                    <Ionicons name={"md-alert"} size={17} color={"#E24747"}/>
                    <Text style={FormStyles.inputError}>
                        {this.state.barcodeError ? this.state.barcodeError : "Some dummy text"}
                        </Text>
                </View>
                <TouchableOpacity
                style={[AppStyles.appButton, FormStyles.submit]} 
                onPress={this.validateForm}>
                    <Text style={[AppStyles.appTextBold, {fontSize: 20}]}>Submit</Text>
                </TouchableOpacity>
                </View>
            </KeyboardAwareScrollView>
        </View>
        </View>
    )
}}


export default ManualEntryForm
