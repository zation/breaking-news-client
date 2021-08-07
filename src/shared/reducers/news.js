import { merge, handleActions, combineActions } from 'relient/reducers';
import { map, flow, prop } from 'lodash/fp';
import { news } from '../schema';
import {
  GET_ALL,
} from '../actions/news';

const mapViewpoint = map(([
  isSupport,
  id,
  // eslint-disable-next-line no-unused-vars
  _,
  authorAddress,
  content,
  images,
  likeAddresses,
  dislikeAddresses,
  // eslint-disable-next-line no-unused-vars
  __,
  createdAt,
]) => ({
  isSupport,
  id,
  authorAddress,
  content,
  images,
  likeAddresses,
  dislikeAddresses,
  createdAt,
}));

export default {
  news: handleActions({
    [combineActions(
      GET_ALL,
    )]: merge({
      preProcess: flow(
        prop('payload'),
        map(([
          title,
          id,
          authorAddress,
          content,
          images,
          likeAddresses,
          dislikeAddresses,
          _,
          createdAt,
          viewpoints,
        ]) => ({
          title,
          id,
          authorAddress,
          content,
          images,
          likeAddresses,
          dislikeAddresses,
          _,
          createdAt,
          viewpoints: mapViewpoint(viewpoints),
        })),
      ),
      schema: news,
    }),

  }, {}),
};
