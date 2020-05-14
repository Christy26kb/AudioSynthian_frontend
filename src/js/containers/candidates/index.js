import { connect } from 'react-redux';
import Candidates from './candidates';

const mapStateToProps = state => ({
  candidates: state.candidates.candidates
});

const mapDispatchToProps = dispatch => ({
  fetchCandidates: () => {
    dispatch({ type: 'CANDIDATES:FETCH' });
  },
  deleteCandidate: (id) => {
    dispatch({ type: 'CANDIDATE:DELETE', id });
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Candidates);
