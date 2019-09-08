import {connect} from 'react-redux';
import ResultsView from './Results';

const mapStateToProps = (state) => ({
    result: state.resultInfo.result,
})

export default ResultsContainer = connect(mapStateToProps)(ResultsView)