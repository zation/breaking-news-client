import { getEntity, getEntityArray } from 'relient/selectors';
import { flow, map, prop, filter, size } from 'lodash/fp';
import { sortByDateDesc } from 'shared/utils/sort';

export default (state) => ({
  currentUserAddress: prop('global.currentUserAddress')(state),
  news: flow(
    getEntityArray('news'),
    sortByDateDesc('createdAt'),
    map((news) => ({
      ...news,
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
    })),
  )(state),
});
