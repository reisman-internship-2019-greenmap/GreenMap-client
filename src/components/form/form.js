import React, {Component} from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {
    Text,
    TouchableOpacity, 
    View,
    TextInput
} from 'react-native';


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
            barcodeValue: '',
            barcodeError: ''
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

        else if (this.state.barcodeValue.length != 12 || this.state.barcodeValue.length != 13) {
            error = "That is not a valid barcode"
        }
       
        this.setState({barcodeError: error}, () => {
            alert(this.state.barcodeError)
        })

    }
     
     //MARK: Display
     render() {
     return (
        <View style={[{padding: 30}, appStyles.centerItems, formStyles.formContainer]}>
            <Text
            style={[appStyles.appTextBold, formStyles.formHeader]}>
                Enter Product Information
            </Text>
            <View style={{alignItems: "flex-start"}}>
            <KeyboardAwareScrollView
                extraScrollHeight={100}>
                <View style={[appStyles.centerItems, formStyles.formContainer]}>
                <Text style={[appStyles.appTextBold, formStyles.formTextInputTitle]}>
                    Barcode
                </Text>
                <TextInput
                style={formStyles.formTextInput}
                placeholder="Ex: 003877698164"
                returnKeyType="done"
                onChangeText={(text) => this.updateValue(text, "barcode")}/>
                <View style={{flexDirection: "row", alignSelf: 'flex-start', alignItems: 'center', marginTop: 5}}>
                    <Ionicons name={"md-alert"} size={17} color={"#E24747"}/>
                    <Text style={formStyles.inputError}>This is some dummy error text</Text>
                </View>
                <TouchableOpacity
                style={[appStyles.appButton, formStyles.submit]} 
                onPress={this.validateForm}>
                    <Text style={[appStyles.appTextBold, {fontSize: 20}]}>Submit</Text>
                </TouchableOpacity>
                </View>
            </KeyboardAwareScrollView>
        </View>
        </View>
    )
}}


export default ManualEntryForm