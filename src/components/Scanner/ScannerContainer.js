import {connect} from 'react-redux';
import Scanner from './Scanner';

const mapStateToProps = (state) => ({
    onScanCalls: state.ScannerInfo.onScanCalls,
    barcodeData: state.ScannerInfo.barcodeData,
    permissions: state.ScannerInfo.permissions,
})

export default ScannerContainer = connect(mapStateToProps)(Scanner)