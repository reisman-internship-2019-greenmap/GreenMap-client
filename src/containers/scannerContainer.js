import {connect} from 'react-redux';
import Scanner from '../components/scanner';

const mapStateToProps = (state) => ({
    onScanCalls: state.ScannerInfo.onScanCalls,
    barcodeData: state.ScannerInfo.barcodeData,
})

export default ScannerContainer = connect(mapStateToProps)(Scanner)