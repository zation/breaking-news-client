import { handleActions } from 'relient/reducers';
import {
  SET_USER_AGENT,
  SET_LANGUAGE,
} from '../actions/global';

export default {
  global: handleActions({
    [SET_LANGUAGE]: (state, { payload }) => ({ ...state, language: payload }),
    [SET_USER_AGENT]: (state, { payload }) => ({ ...state, userAgent: payload }),
  }, {}),
};
