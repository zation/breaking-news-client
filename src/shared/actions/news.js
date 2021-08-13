import { createAction, actionTypeCreator } from 'relient/actions';

const actionType = actionTypeCreator(__filename);

export const GET_ALL = actionType('GET_ALL');
export const CREATE = actionType('CREATE');
export const CREATE_VIEWPOINT = actionType('CREATE_VIEWPOINT');

export const getAll = createAction(GET_ALL);
export const create = createAction(CREATE);
export const createViewpoint = createAction(CREATE_VIEWPOINT);
