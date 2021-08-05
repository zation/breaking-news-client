import { internet, lorem, image, datatype } from 'faker';
import { keyBy, range, sample, flow, map, sampleSize, prop } from 'lodash/fp';

const randomArray = flow(
  range(0),
  sample,
  (number) => new Array(number + 1),
);

const getUser = (values = {}) => ({
  address: internet.mac(),
  credibility: Math.round((Math.random() - Math.random()) * 100),
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

const news = map(getNews)(range(0, 20));

export default {
  entities: {
    user: keyBy(prop('address'))(users),
    news: keyBy(prop('id'))(news),
  },
};
