import { connect } from 'react-redux';
import Exam from './exam';

const mapStateToProps = state => ({
  currentUser: state.app.currentUser,
  questions: state.dashboard.questions,
  questionSets: state.dashboard.questionSets,
  userInteractionMode: state.preferences.userInteractionMode,
  examConfigs: state.preferences.examConfigs,
  emailConfigs: state.preferences.emailConfigs
});

const mapDispatchToProps = dispatch => ({
  updateExamConfigs: (data) => {
    dispatch({ type: 'EXAM_CONFIGS:SET', data });
  },
  onExamComplete: (data) => {
    dispatch({ type: 'EXAM:COMPLETE', data });
  },
  examConfigsReset: () => dispatch({ type: 'EXAM_CONFIGS:RESET' }),
  emailConfigsReset: () => dispatch({ type: 'EMAIL_CONFIGS:RESET' })
});

export default connect(mapStateToProps, mapDispatchToProps)(Exam);
