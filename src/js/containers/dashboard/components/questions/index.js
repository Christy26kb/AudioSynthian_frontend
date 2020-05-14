import { connect } from 'react-redux';
import Questions from './questions';

const mapStateToProps = state => ({
  questions: state.dashboard.questions
});

const mapDispatchToProps = dispatch => ({
  updateQuestion: (questions) => {
    dispatch({ type: 'QUESTION:UPDATE', data: questions });
  },
  fetchQuestions: () => {
    dispatch({ type: 'QUESTIONS:FETCH' });
  },
  createQuestion: (question) => {
    dispatch({ type: 'QUESTION:CREATE', data: question });
  },
  deleteQuestion: (id) => {
    dispatch({ type: 'QUESTION:DELETE', id });
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
