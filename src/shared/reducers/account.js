import { merge, handleActions, combineActions } from 'relient/reducers';
import { account } from '../schema';
import {
  REGISTER,
} from '../actions/account';

export default {
  account: handleActions({
    [combineActions(
      REGISTER,
    )]: merge({ schema: account }),

  }, {}),
};
