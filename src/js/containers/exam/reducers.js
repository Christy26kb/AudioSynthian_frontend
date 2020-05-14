import Immutable from 'seamless-immutable';

const defaultState = Immutable.flatMap({
});

export default (state = defaultState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
