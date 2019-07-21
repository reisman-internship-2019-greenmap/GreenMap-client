import styleVars from '../../globals/styles/StyleVars';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    formContainer: {
        flex: 1,
        backgroundColor: styleVars.colors.tinted_white,
    },

    formHeader: {
        fontSize:20, 
        color: styleVars.colors.dark_green, 
        paddingBottom: 30,
        marginTop: 50
    },

    formModalTitle: {
        color: styleVars.colors.light_green,
        textAlign: "center",
        padding: 20,
        fontSize: 45,
    },

    submit: {
        marginTop: 50, 
        marginBottom: 20,
        padding: 10
    },

    formTextInput: {
      borderColor: styleVars.colors.dark_green,
      width: 300,
      borderWidth: 1,
      height: 40,
      padding: 10,
    },

    formTextInputTitle: {
        color: styleVars.colors.dark_green, 
        alignSelf: 'flex-start',
        fontSize: 17
    },

    formInputContainer: {
        flex: 1, 
        flexDirection: "column", 
        justifyContent: "flex-start", 
        margin: 6
    },

    inputError: {
        fontSize: 13,
        color: "#E24747",
        fontWeight: "bold",
        marginLeft: 10
    }
})