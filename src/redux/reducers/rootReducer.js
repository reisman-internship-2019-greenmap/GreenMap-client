import {combineReducers} from 'redux';
import ScannerReducer from './scannerReducer';
import ResultReducer from './resultReducer';

const RootReducer = combineReducers({
    scannerComponent: ScannerReducer,
    resultStatus: ResultReducer})

export default RootReducer