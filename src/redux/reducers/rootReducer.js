import {combineReducers} from 'redux';
import ScannerReducer from './scannerReducer';
import ResultReducer from './resultReducer';
import {reducer as form} from 'redux-form';

const RootReducer = combineReducers({
    ScannerInfo: ScannerReducer,
    resultInfo: ResultReducer,
    form: form,
})

export default RootReducer