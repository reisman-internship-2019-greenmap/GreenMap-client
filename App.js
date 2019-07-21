//modules
import React, {Component} from 'react';
import {View} from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';

//redux
import store from './src/redux/store/store';
import {Provider} from 'react-redux';
import * as Font from 'expo-font';

//components
import ScannerContainer from './src/components/Scanner/ScannerContainer';
import ResultsContainer from './src/components/Results/ResultContainer';
import FormContainer from './src/components/Form/FormContainer';
import {
    headerRightButton, 
    headerBackButton, 
    headerTitle
} from './src/components/NavigationHeader/NavigationHeader';

//styling
import AppStyles from './src/globals/styles/AppStyle';



//set up navigation
let RootStack = createStackNavigator ({
     ScannerScreen: { 
         screen: ScannerContainer,
    },

    ResultsScreen: {
        screen: ResultsContainer,
        navigationOptions: {
            headerTitle: headerTitle("Results")
        }
    },

    FormScreen: {
        screen: FormContainer,
    }}, //end screen config

    //start navigator config
    {
        initialRouteName: "ScannerScreen",
        defaultNavigationOptions: {
            headerStyle: AppStyles.headerStyle,
            headerRight: headerRightButton(),
            headerBackTitle: null,
            headerBackImage: headerBackButton()
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

