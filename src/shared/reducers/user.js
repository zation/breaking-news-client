import { merge, handleActions, combineActions } from 'relient/reducers';
import { map, flow, prop } from 'lodash/fp';
import { user } from '../schema';
import {
  GET_ALL,
} from '../actions/user';

export default {
  user: handleActions({
    [combineActions(
      GET_ALL,
    )]: merge({
      preProcess: flow(
        prop('payload'),
        map(([
          address,
          credibility,
        ]) => ({
          address,
          credibility,
        })),
      ),
      schema: user,
    }),

  }, {}),
};
