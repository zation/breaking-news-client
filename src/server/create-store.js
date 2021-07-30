import { createStore, applyMiddleware } from 'redux';
import { serverError } from 'relient/middlewares';
import reducers from 'shared/reducers';
import fetchMiddleware from 'shared/middlewares/fetch';
import fetch from 'isomorphic-fetch/fetch-npm-node';
import getConfig from 'relient/config';
import logger from './redux-logger';

export default ({ initialState = {} }) => createStore(
  reducers,
  initialState,
  applyMiddleware(
    fetchMiddleware({ fetch, apiDomain: getConfig('serverAPIDomain') }),
    serverError({}),
    logger,
  ),
);
