//import from node_modules
import React, {Component} from 'react';
import {createStackNavigator, createAppContainer} from 'react-navigation';

//redux stuff
import store from './src/redux/store/store';
import {Provider} from 'react-redux'

import ScannerContainer from './src/containers/scannerContainer';
import ResultsContainer from './src/containers/resultContainer';



//set up navigation
let RootStack = createStackNavigator ({
     ScannerScreen: { 
         screen: ScannerContainer
        },
    ResultsScreen: {
        screen: ResultsContainer
        }
    },

    {
        initialRouteName: "ScannerScreen",
    }
);

let Navigator = createAppContainer(RootStack);

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Navigator />
            </Provider>  
        )
    }
}

