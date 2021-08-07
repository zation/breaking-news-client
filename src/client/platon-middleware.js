import { GET_ALL as GET_ALL_USER } from 'shared/actions/user';
import { GET_ALL as GET_ALL_NEWS } from 'shared/actions/news';
import { users, news } from './fake-data';

export default () => (next) => (action) => {
  const { type } = action;
  if (type === GET_ALL_USER) {
    return next({ ...action, payload: users });
  }
  if (type === GET_ALL_NEWS) {
    return next({ ...action, payload: news });
  }
  return next(action);
};
