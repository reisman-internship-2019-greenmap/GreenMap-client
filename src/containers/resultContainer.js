import {connect} from 'react-redux';
import ResultsView from '../components/results';

const mapStateToProps = (state) => ({
    didWikiMiss: state.resultStatus.didWikiMiss,
    didBarcodeMiss: state.resultStatus.didBarcodeMiss,
})

export default ResultsContainer = connect(mapStateToProps)(ResultsView)