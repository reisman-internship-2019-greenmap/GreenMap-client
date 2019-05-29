import {connect} from 'react-redux';
import Scanner from '../components/scanner';

const mapStateToProps = (state) => ({
    onScanCalls: state.ScannerInfo.onScanCalls
})

export default ScannerContainer = connect(mapStateToProps)(Scanner)