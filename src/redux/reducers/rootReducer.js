import {combineReducers} from 'redux';
import ScannerReducer from './scannerReducer';
import ResultReducer from './resultReducer';

const RootReducer = combineReducers({
    ScannerInfo: ScannerReducer,
    resultInfo: ResultReducer,
})

export default RootReducer