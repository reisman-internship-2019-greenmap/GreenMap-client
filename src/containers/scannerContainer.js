import {connect} from 'react-redux';
import Scanner from '../components/scanner';

const mapStateToProps = (state) => ({
    data: state.scannerComponent.data,
})

export default ScannerContainer = connect(mapStateToProps)(Scanner)