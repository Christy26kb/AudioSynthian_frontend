import { connect } from 'react-redux';
import QuestionSet from './questionSets';

const mapStateToProps = state => ({
  questions: state.dashboard.questions,
  questionSets: state.dashboard.questionSets
});

const mapDispatchToProps = dispatch => ({
  onUpdateQuestionSets: (questionSets) => {
    dispatch({ type: 'QUESTION_SETS:SET', data: questionSets });
  },
  fetchQuestionSets: () => {
    dispatch({ type: 'QUESTION_SETS:FETCH' });
  },
  createQuestionSet: (questionSet) => {
    dispatch({ type: 'QUESTION_SET:CREATE', data: questionSet });
  },
  updateQuestionSet: (questionSet) => {
    dispatch({ type: 'QUESTION_SET:UPDATE', data: questionSet });
  },
  deleteQuestionSet: (id) => {
    dispatch({ type: 'QUESTION_SET:DELETE', id });
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionSet);
