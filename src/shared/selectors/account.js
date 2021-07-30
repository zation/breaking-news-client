import { getEntity } from 'relient/selectors';
import { flow, prop } from 'lodash/fp';

// eslint-disable-next-line import/prefer-default-export
export const getCurrentAccount = (state) => flow(
  getEntity('account'),
  prop(getEntity('auth.currentAccountId')(state)),
)(state);
