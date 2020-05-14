import Immutable from 'seamless-immutable';

const defaultState = Immutable.flatMap({
  currentUser: {}
});

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'CURRENT_USER:SET':
      return Immutable.merge(state, { currentUser: action.data });
    default:
      return state;
  }
};
