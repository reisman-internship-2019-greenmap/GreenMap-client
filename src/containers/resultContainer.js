import {connect} from 'react-redux';
import ResultsView from '../components/results';

const mapStateToProps = (state) => ({
    didWikiMiss: state.resultInfo.didWikiMiss,
    didBarcodeMiss: state.resultInfo.didBarcodeMiss,
    resultDoc: state.resultInfo.result,
})

export default ResultsContainer = connect(mapStateToProps)(ResultsView)