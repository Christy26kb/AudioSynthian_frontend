import React from 'react';
import ReactDOM from 'react-dom';

import 'babel-polyfill';
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';
import createHashHistory from 'history/createHashHistory';

import registry from 'app-registry';

import { store } from './store';
import routes from './routes';

import storage from './services/storage';
import logger from './services/logger';
import request from './services/request';

import ErrorBoundary from './errorBoundary';
import '../styles.css';
import 'antd/dist/antd.css';


registry.register('storage', storage);
registry.register('logger', logger);
registry.register('store', store);
registry.register('request', request);

/* eslint-disable */
if (typeof appConfig !== 'undefined') {
  const config = appConfig || {};
  registry.register('config', config);
  if (config.logger && config.logger.level) {
    logger.setLevel(config.logger.level);
  }
} else {
  registry.get('logger').warning('WARNING: the config is not defined');
}

/* eslint-enable no-undef */
store.dispatch({ type: 'APP:INIT' });
const history = createHashHistory();

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <ErrorBoundary>
        {routes}
      </ErrorBoundary>
    </Router>
  </Provider>,
  document.getElementById('app')
);
