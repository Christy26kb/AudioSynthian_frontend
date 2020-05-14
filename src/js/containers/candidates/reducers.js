import Immutable from 'seamless-immutable';

const defaultState = Immutable.flatMap({
  candidates: []
});

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'CANDIDATES:SET':
      return Immutable.merge(state, { candidates: action.data });
    default:
      return state;
  }
};
