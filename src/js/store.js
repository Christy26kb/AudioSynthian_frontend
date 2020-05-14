import { createLogger } from 'redux-logger';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import createHistory from 'history/createHashHistory';

import { routerReducer, routerMiddleware } from 'react-router-redux';

import reducers from './reducers';
import sagas from './sagas';

const sagaMiddleware = createSagaMiddleware();

const reducer = combineReducers(Object.assign({}, reducers, {
  routing: routerReducer
}));

const rootReducer = (defaultState, action) => {
  let state = defaultState;
  if (action.type === 'LOGOUT:SUCCESS') {
    state = undefined;
  }
  return reducer(state, action);
};

export const history = createHistory({ queryKey: false });

const middlewares = [];


/* eslint-disable no-underscore-dangle */
const composeEnhancers = typeof window === 'object'
    && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
  }) : compose;

/* eslint-enable */
/* eslint-disable no-undef */
if ((typeof (ENV) !== 'undefined') && ENV.logDispatcher) {
  middlewares.push(createLogger({ collapsed: true }));
}


/* eslint-enable no-undef */
middlewares.push(sagaMiddleware);
middlewares.push(routerMiddleware(history));

export const store = composeEnhancers(applyMiddleware(...middlewares))(createStore)(rootReducer);

sagaMiddleware.run(sagas);
export default 'store';
