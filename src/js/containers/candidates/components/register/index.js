import { connect } from 'react-redux';
import CandidateSignup from './candidateSignup';

const mapDispatchToProps = dispatch => ({
  onCandidateSignup: (data) => {
    dispatch({ type: 'CANDIDATE:SIGNUP', data });
  }
});

export default connect(null, mapDispatchToProps)(CandidateSignup);
