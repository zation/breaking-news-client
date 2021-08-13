import { getEntity } from 'relient/selectors';
import { flow, map, size, prop, filter } from 'lodash/fp';
import { sortByDateDesc } from 'shared/utils/sort';

export default (newsId) => (state) => ({
  currentUserAddress: prop('global.currentUserAddress')(state),
  news: flow(
    getEntity(`news.${newsId}`),
    (news) => news && ({
      ...news,
      viewpoints: flow(
        prop('viewpoints'),
        sortByDateDesc('createdAt'),
        map((viewpoint) => ({
          ...viewpoint,
          author: getEntity(`user.${viewpoint.authorAddress}`)(state),
        })),
      )(news),
      author: getEntity(`user.${news.authorAddress}`)(state),
      supportCount: flow(
        prop('viewpoints'),
        filter(({ isSupport }) => isSupport),
        size,
      )(news),
      notSupportCount: flow(
        prop('viewpoints'),
        filter(({ isSupport }) => !isSupport),
        size,
      )(news),
    }),
  )(state),
});
