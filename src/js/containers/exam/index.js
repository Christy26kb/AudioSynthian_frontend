import { connect } from 'react-redux';
import Exam from './exam';

const mapStateToProps = state => ({
  questions: state.dashboard.questions,
  questionSets: state.dashboard.questionSets,
  userInteractionMode: state.preferences.userInteractionMode,
  examConfigs: state.preferences.examConfigs,
  emailConfigs: state.preferences.emailConfigs
});

const mapDispatchToProps = dispatch => ({
  updateExamConfigs: (data) => {
    dispatch({ type: 'EXAM_CONFIGS:SET', data });
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Exam);
