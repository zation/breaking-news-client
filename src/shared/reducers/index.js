import { combineReducers } from 'redux';
import { createReducer } from 'relient/reducers';
import account from './account';
import global from './global';

export default combineReducers({
  ...createReducer([
    account,
  ]),
  ...global,
});
