import { sortBy, prop } from 'lodash/fp';

export const sortByDate = (attribute) => sortBy(
  [(item) => new Date(prop(attribute)(item)).getTime()],
);

export const sortByDateDesc = (attribute) => sortBy(
  [(item) => -new Date(prop(attribute)(item)).getTime()],
);
