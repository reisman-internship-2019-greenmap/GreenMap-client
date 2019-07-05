import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faLeaf, faBars } from '@fortawesome/free-solid-svg-icons';

import navBarStyles from '../styles/navBarStyles';
import appStyles from '../styles/appStyle'

customNavBar = (title) => {
    return (
        <View style={navBarStyles.container}>
            <FontAwesomeIcon icon={faLeaf} size={20} color={"white"}/>
            <Text style={[appStyles.appTextBold, navBarStyles.title]}>{title}</Text>
        </View>
    )
}

headerRightButton = () => {
    return (
        <View style={{marginRight: 20}}>
            <TouchableOpacity onPress={() => alert("You pressed me!")}>
                <FontAwesomeIcon icon={faBars} size={25} color={"white"}/>
            </TouchableOpacity>
        </View>
    )
}

module.exports = {
    customNavBar: customNavBar,
    headerRightButton: headerRightButton
}