import { getEntity } from 'relient/selectors';

export default (newsId) => (state) => ({
  news: getEntity(`news.${newsId}`)(state),
});
