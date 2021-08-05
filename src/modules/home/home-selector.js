import { internet, lorem, image, datatype } from 'faker';
import { range, sample, flow, map, sampleSize, prop, filter, size, find, propEq } from 'lodash/fp';

const randomArray = flow(
  range(0),
  sample,
  (number) => new Array(number + 1),
);

const getUser = (values = {}) => ({
  address: internet.mac(),
  credibility: datatype.number(),
  ...values,
});

const users = map(getUser)(range(0, 100));

const getViewpoint = (values = {}) => ({
  id: datatype.number(),
  authorAddress: flow(sample, prop('address'))(users),
  title: lorem.sentence(),
  content: lorem.paragraphs(),
  images: flow(
    randomArray,
    map(() => image.image()),
  )(4),
  likeAddresses: flow(
    sampleSize(sample(range(0, 40))),
    map(prop('address')),
  )(users),
  dislikeAddresses: flow(
    sampleSize(sample(range(0, 40))),
    map(prop('address')),
  )(users),
  createdAt: datatype.datetime(),
  isSupport: datatype.boolean(),
  ...values,
});

const getNews = (values = {}) => ({
  id: datatype.number(),
  authorAddress: flow(sample, prop('address'))(users),
  title: lorem.sentence(),
  content: lorem.paragraphs(),
  images: flow(
    randomArray,
    map(() => image.image()),
  )(4),
  likeAddresses: flow(
    sampleSize(sample(range(0, 40))),
    map(prop('address')),
  )(users),
  dislikeAddresses: flow(
    sampleSize(sample(range(0, 40))),
    map(prop('address')),
  )(users),
  createdAt: datatype.datetime(),
  viewpoints: flow(
    randomArray,
    map(getViewpoint),
  )(30),
  ...values,
});

export default () => ({
  news: map(() => {
    const news = getNews();
    return ({
      ...news,
      author: find(propEq('address', news.authorAddress))(users),
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
    });
  })(range(0, 10)),
});
