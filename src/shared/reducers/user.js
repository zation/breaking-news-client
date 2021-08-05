import { merge, handleActions, combineActions } from 'relient/reducers';
import { user } from '../schema';
import {
  GET_ALL,
} from '../actions/user';

export default {
  user: handleActions({
    [combineActions(
      GET_ALL,
    )]: merge({ schema: user }),

  }, {}),
};
