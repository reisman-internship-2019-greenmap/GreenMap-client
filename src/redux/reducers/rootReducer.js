import {combineReducers} from 'redux';
import ScannerReducer from '../../components/Scanner/ScannerReducer';
import ResultReducer from '../../components/Results/ResultReducer';

const RootReducer = combineReducers({
    ScannerInfo: ScannerReducer,
    resultInfo: ResultReducer,
})

export default RootReducer