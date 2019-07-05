import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faLeaf, faBars, faChevronLeft } from '@fortawesome/free-solid-svg-icons';

import navBarStyles from '../styles/navBarStyles';
import appStyles from '../styles/appStyle'

headerTitle = (title) => {
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

headerBackButton = () => {
    return (
        <FontAwesomeIcon icon={faChevronLeft} size={25} color={"white"} />
    )
}
   


module.exports = {
    headerTitle: headerTitle,
    headerRightButton: headerRightButton,
    headerBackButton: headerBackButton
}