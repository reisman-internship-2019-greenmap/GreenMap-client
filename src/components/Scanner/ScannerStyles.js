import {StyleSheet} from 'react-native'

const opacity = 'rgba(0, 0, 0, .6)';

export default StyleSheet.create({

    scannerContainer: {
        flex: 1,
        flexDirection: 'column'
    },

    boundingView: {
        flex: 1,
        backgroundColor: opacity,
    },

    topView: {
        flex: 1.2
    },

    center: {
        flex: 1,
        flexDirection: "row"
    },

    focusBox: {
        flex: 10
    },

    bottom: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1.2
    }
})