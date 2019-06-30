import React from 'react';
import {View, Text} from 'react-native';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faLeaf } from '@fortawesome/free-solid-svg-icons';

import navBarStyles from '../styles/navBarStyles';
import appStyles from '../styles/appStyle'

export default CustomNavBar = (title) => {
    return (
        <View style={navBarStyles.container}>
            <FontAwesomeIcon icon={faLeaf} size={20} color={"white"}/>
            <Text style={[appStyles.appTextBold, navBarStyles.title]}>{title}</Text>
        </View>
    )
}