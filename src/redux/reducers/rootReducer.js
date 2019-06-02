import {combineReducers} from 'redux';
import ScannerReducer from './scannerReducer';
import ResultReducer from './resultReducer';
import {reducer as FormReducer} from 'redux-form';

const RootReducer = combineReducers({
    ScannerInfo: ScannerReducer,
    resultInfo: ResultReducer,
    FormInfo: FormReducer,
})

export default RootReducer