import { connect } from 'react-redux';
import Preferences from './preferences';

const mapStateToProps = state => ({
  questionSets: state.dashboard.questionSets,
  userInteractionMode: state.preferences.userInteractionMode,
  examConfigs: state.preferences.examConfigs,
  emailConfigs: state.preferences.emailConfigs
});

const mapDispatchToProps = dispatch => ({
  onUpdateExamConfigs: (updatedConfigs) => {
    dispatch({ type: 'EXAM_CONFIGS:SET', data: updatedConfigs });
  },
  onUpdateEmailConfigs: (updatedConfigs) => {
    dispatch({ type: 'EMAIL_CONFIGS:SET', data: updatedConfigs });
  },
  onInteractionModeChange: (data) => {
    dispatch({ type: 'USER_INTERACTION_MODE:SET', data });
  },
  fetchQuestions: () => {
    dispatch({ type: 'QUESTIONS:FETCH' });
  },
  fetchQuestionSets: () => {
    dispatch({ type: 'QUESTION_SETS:FETCH' });
  },
  onCandidateActionLogin: (email, password) => {
    dispatch({ type: 'CANDIDATE_ACTION:LOGIN', email, password });
  },
  onCandidateVoiceLogin: () => {
    dispatch({ type: 'CANDIDATE_VOICE:LOGIN' });
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Preferences);
