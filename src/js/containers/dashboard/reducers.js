import Immutable from 'seamless-immutable';

const defaultState = Immutable.flatMap({
  questions: [],
  questionSets: []
});

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'QUESTIONS:SET':
      return Immutable.merge(state, { questions: action.data });
    case 'QUESTION_SETS:SET':
      return Immutable.merge(state, { questionSets: action.data });
    default:
      return state;
  }
};
