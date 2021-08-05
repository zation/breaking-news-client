import { merge, handleActions, combineActions } from 'relient/reducers';
import { news } from '../schema';
import {
  GET_ALL,
} from '../actions/news';

export default {
  news: handleActions({
    [combineActions(
      GET_ALL,
    )]: merge({ schema: news }),

  }, {}),
};
