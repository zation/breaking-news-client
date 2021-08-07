import { getEntity } from 'relient/selectors';
import { prop } from 'lodash/fp';

export default (newsId) => (state) => ({
  currentUserAddress: prop('global.currentUserAddress')(state),
  news: getEntity(`news.${newsId}`)(state),
});
