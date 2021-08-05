import { combineReducers } from 'redux';
import { createReducer } from 'relient/reducers';
import user from './user';
import news from './news';
import global from './global';

export default combineReducers({
  ...createReducer([
    user,
    news,
  ]),
  ...global,
});
