import { createStore, applyMiddleware, compose } from 'redux';
import {
  history as historyMiddleware,
  serverError,
} from 'relient/middlewares';
import reducers from 'shared/reducers';
import fetch from 'isomorphic-fetch/fetch-npm-browserify';
import fetchMiddleware from 'shared/middlewares/fetch';
import pushMiddleware from 'relient/middlewares/push';
import getConfig from 'relient/config';
import platonMiddleware from './platon/middleware';
import history from './history';

const { __REDUX_DEVTOOLS_EXTENSION__, __INITIAL_STATE__ = {} } = global;

const middlewares = [
  fetchMiddleware({ fetch, apiDomain: `${global.location.origin}/api` }),
  pushMiddleware(getConfig('baseUrl')),
  historyMiddleware(history),
  serverError({}),
  platonMiddleware,
];
let enhancer = applyMiddleware(...middlewares);

if (__DEV__) {
  // eslint-disable-next-line global-require
  middlewares.push(require('redux-logger').createLogger({ collapsed: true }));
  if (__REDUX_DEVTOOLS_EXTENSION__) {
    enhancer = compose(
      applyMiddleware(...middlewares),
      __REDUX_DEVTOOLS_EXTENSION__(),
    );
  }
}

export default createStore(
  reducers,
  __INITIAL_STATE__,
  enhancer,
);
