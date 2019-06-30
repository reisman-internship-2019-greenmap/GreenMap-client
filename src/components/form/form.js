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
    constructor(props) {
        super(props)
        this.state = {

        }
    }
     
     //MARK: Display
     render() {
     return (
        <View style={[{padding: 30}, appStyles.centerItems, formStyles.formContainer]}>
            <Text
            style={[appStyles.appTextBold, formStyles.formHeader]}>
                Enter Product Information Below
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
            <KeyboardAwareScrollView
                extraScrollHeight={100}>
                <View style={[appStyles.centerItems, formStyles.formContainer]}>
                <TextInput
                style={formStyles.formTextInput}
                placeholder="Ex: 003877698164"
                returnKeyType="done"/>
                <TouchableOpacity
                style={[appStyles.appButton, formStyles.submit]} 
                onPress={() => alert("you pressed submit!")}>
                    <Text style={[appStyles.appTextBold, {fontSize: 22}]}>Submit</Text>
                </TouchableOpacity>
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}}


export default ManualEntryForm