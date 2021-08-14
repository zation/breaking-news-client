import { createAction, actionTypeCreator } from 'relient/actions';

const actionType = actionTypeCreator(__filename);

export const GET_ALL = actionType('GET_ALL');
export const CREATE = actionType('CREATE');
export const CREATE_VIEWPOINT = actionType('CREATE_VIEWPOINT');
export const LIKE = actionType('LIKE');
export const DISLIKE = actionType('DISLIKE');
export const LIKE_VIEWPOINT = actionType('LIKE_VIEWPOINT');
export const DISLIKE_VIEWPOINT = actionType('DISLIKE_VIEWPOINT');
export const CANCEL_LIKE = actionType('CANCEL_LIKE');
export const CANCEL_DISLIKE = actionType('CANCEL_DISLIKE');
export const CANCEL_LIKE_VIEWPOINT = actionType('CANCEL_LIKE_VIEWPOINT');
export const CANCEL_DISLIKE_VIEWPOINT = actionType('CANCEL_DISLIKE_VIEWPOINT');

export const getAll = createAction(GET_ALL);
export const create = createAction(CREATE);
export const createViewpoint = createAction(CREATE_VIEWPOINT);
export const like = createAction(LIKE);
export const dislike = createAction(DISLIKE);
export const likeViewpoint = createAction(LIKE_VIEWPOINT);
export const dislikeViewpoint = createAction(DISLIKE_VIEWPOINT);
export const cancelLike = createAction(CANCEL_LIKE);
export const cancelDislike = createAction(CANCEL_DISLIKE);
export const cancelLikeViewpoint = createAction(CANCEL_LIKE_VIEWPOINT);
export const cancelDislikeViewpoint = createAction(CANCEL_DISLIKE_VIEWPOINT);
