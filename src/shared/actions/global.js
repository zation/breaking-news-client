import {
  createAction,
  actionTypeCreator,
} from 'relient/actions';

const actionType = actionTypeCreator('global');

export const SET_LANGUAGE = actionType('SET_LANGUAGE');
export const SET_USER_AGENT = actionType('SET_USER_AGENT');
export const SET_CURRENT_USER_ADDRESS = actionType('SET_CURRENT_USER_ADDRESS');

export const setLanguage = createAction(SET_LANGUAGE);
export const setUserAgent = createAction(SET_USER_AGENT);
export const setCurrentUserAddress = createAction(SET_CURRENT_USER_ADDRESS);
