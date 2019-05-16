import {createStackNavigator, createAppContainer} from 'react-navigation';

import ScannerController from './components/scannerController';
import ResultScreen from './components/resultsScreen';
import LandingScreen from './components/landingScreen';


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
    },
    {
        initialRouteName: "Landing",
    }
);

 export default createAppContainer(navigator);

