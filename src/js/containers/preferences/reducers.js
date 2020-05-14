import Immutable from 'seamless-immutable';

const defaultState = Immutable.flatMap({
  userInteractionMode: 'action',
  examConfigs: {
    questionSet: '',
    candidateUsername: '',
    candidatePassword: '',
    result: []
  },
  emailConfigs: {
    adminEmail: '',
    candidateEmail: ''
  }
});

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'USER_INTERACTION_MODE:SET':
      return Immutable.merge(state, { userInteractionMode: action.data });
    case 'EXAM_CONFIGS:SET':
      return Immutable.merge(state, { examConfigs: action.data });
    case 'EMAIL_CONFIGS:SET':
      return Immutable.merge(state, { emailConfigs: action.data });
    default:
      return state;
  }
};
