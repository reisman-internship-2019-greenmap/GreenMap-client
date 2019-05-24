import {connect} from 'react-redux';
import Scanner from '../components/scanner';

const mapStateToProps = (state) => ({
    barcodeData: state.scannerComponent.barcodeData,
    areFontsLoaded: state.loadingStatus.areFontsLoaded,
})

export default ScannerContainer = connect(mapStateToProps)(Scanner)