import {connect} from 'react-redux';
import Scanner from '../components/scanner';

const mapStateToProps = (state) => ({
    barcodeData: state.scannerComponent.barcodeData,
    loadingResults: state.scannerComponent.loadingResults,
})

export default ScannerContainer = connect(mapStateToProps)(Scanner)