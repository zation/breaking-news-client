import { createAction, actionTypeCreator } from 'relient/actions';

const actionType = actionTypeCreator(__filename);

export const GET_ALL = actionType('GET_ALL');

export const getAll = createAction(GET_ALL);
