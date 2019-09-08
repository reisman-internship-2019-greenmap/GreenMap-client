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
import {getProductInfo, getTopFive } from '../../utils/networking';



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
            if (this.state.barcodeError == null) {
                getProductInfo(this.state.barcodeValue)
                .then(getProductRes => {
                    if (getProductRes === "The connection timed out") {
                        this.props.dispatch({type: "RESULT_ERROR", payload: getProductRes})
                    }

                    else {
                        getTopFive(this.state.barcodeValue)
                        .then(topFiveRes => {
        
                            //compose final response object here
                            finalRes = {
                                "name": getProductRes.doc.name,
                                "ESG": getProductRes.doc.ESG,
                                "topFive": topFiveRes.docs,
                                "category": topFiveRes.category
                            }
                            //then send it to store
                            console.log("Line before dispatch in form")
                            this.props.dispatch({type: "RESULT_SUCCESS", result: finalRes})
                        })  
                    }
                })
                .catch(err => {
                    this.props.dispatch({type: "RESULT_ERROR", payload: err})
                })
                
                // this line will execute before server Promises resolve/reject.
                // the result component will re-render when its state
                // is updated via redux, which happens when the Promises
                // above resolve or reject.
                this.props.navigation.navigate("ResultsScreen");
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
