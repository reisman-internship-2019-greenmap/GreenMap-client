//import from node_modules
import React, {Component} from 'react';
import {View} from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';

//redux stuff
import store from './src/redux/store/store';
import {Provider} from 'react-redux';
import * as Font from 'expo-font';

//components
import ScannerContainer from './src/containers/scannerContainer';
import ResultsContainer from './src/containers/resultContainer';
import ManualEntryForm from './src/components/form/form';
import {headerRightButton} from './utils/CustomNavBar';

//styling
import appStyles from './styles/appStyle';



//set up navigation
let RootStack = createStackNavigator ({
     ScannerScreen: { 
         screen: ScannerContainer,
    },

    ResultsScreen: {
        screen: ResultsContainer,
        navigationOptions: {
            headerTitle: "Your Results"
        }
        },

    FormScreen: {
        screen: ManualEntryForm,
        navigationOptions: {
            headerTitle: "Product form"
        }
    }}, //end screen config

    //start navigator config
    {
        initialRouteName: "ScannerScreen",
        defaultNavigationOptions: {
            headerStyle: appStyles.headerStyle,
            headerRight: headerRightButton()
        }
    }
);

let Navigator = createAppContainer(RootStack);

export default class App extends Component {
    //MARK: init
    constructor(props){
        super(props);
        
        this.state = {
            fontsLoaded: false,
        }

    }

    async componentDidMount() {
        await Font.loadAsync({
            "Raleway-Extra-Bold": require("./assets/Raleway-ExtraBold.ttf"),
            "Raleway-Regular": require('./assets/Raleway-Regular.ttf')
        });
        this.setState({fontsLoaded : true});
    }
    
    render() {
        return (
            <Provider store={store}>
                {this.state.fontsLoaded ? <Navigator /> :
                <View />}
            </Provider>  
        )
    }
}

