import {combineReducers} from 'redux';
import ScannerReducer from './scannerReducer';
import ResultReducer from './resultReducer';

const RootReducer = combineReducers({
    ScannerInfo: ScannerReducer,
    resultStatus: ResultReducer,
})

export default RootReducer