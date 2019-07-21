"use strict";


import {StyleSheet} from 'react-native';
import styleVars from './StyleVars'

export default StyleSheet.create({
    appButton: {
        backgroundColor: styleVars.colors.dark_green,
        padding: 15,
        borderRadius: 8,
        borderColor: "black",
        borderWidth: 1,
    },

    appTextBold: {
        fontFamily: styleVars.fonts.bold,
        color: '#ffffff',
        textAlign: 'center',
    },

    appTextReg: {
        fontFamily: styleVars.fonts.regular,
        color: '#44963A',
        textAlign: 'left',
    },

    centerItems: {
        alignItems: "center",
        justifyContent: "center"
    },

    headerStyle: {
        backgroundColor: styleVars.colors.dark_green,
        borderBottomWidth: 0
    }
})
