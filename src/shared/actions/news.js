import { createAction, actionTypeCreator } from 'relient/actions';

const actionType = actionTypeCreator(__filename);

export const GET_ALL = actionType('GET_ALL');
export const CREATE = actionType('CREATE');
export const CREATE_VIEWPOINT = actionType('CREATE_VIEWPOINT');

export const getAll = createAction(GET_ALL);
export const create = createAction(CREATE, ({
  title,
  content,
  images,
  createdAt,
}) => [
  title,
  content,
  images,
  createdAt,
]);
export const createViewpoint = createAction(CREATE_VIEWPOINT, ({
  title,
  newsId,
  content,
  images,
  isSupported,
  createdAt,
}) => [
  title,
  newsId,
  content,
  images,
  isSupported,
  createdAt,
]);
