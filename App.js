import {createStackNavigator, createAppContainer} from 'react-navigation';

import ScannerController from './components/controllers/scannerController';
import ResultScreen from './components/screens/resultsScreen';
import LandingScreen from './components/screens/landingScreen';
import FormScreen from './components/screens/formScreen'


/*TODO: 
 - implement stack naviagtion
     - set up routes
     - set up navigation flow
 - implement redux
 */

 const navigator = createStackNavigator ({
     Landing: LandingScreen,
     Scanner: ScannerController,
     Results: ResultScreen,
     Form: FormScreen,
    },
    {
        initialRouteName: "Scanner",
    }
);

 export default createAppContainer(navigator);

