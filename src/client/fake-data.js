import { internet, lorem, image, datatype } from 'faker';
import { range, sample, flow, map, sampleSize, first } from 'lodash/fp';

const randomArray = flow(
  range(0),
  sample,
  (number) => new Array(number + 1),
);

const getUser = () => [
  internet.mac(), // address
  Math.round((Math.random() - Math.random()) * 100), // credibility
];

export const users = map(getUser)(range(0, 100));

const getViewpoint = () => [
  datatype.boolean(), // isSupport
  datatype.number(), // id
  '', // news id
  flow(sample, first)(users), // authorAddress
  `${lorem.sentence()} ${lorem.sentence()}`, // title
  lorem.paragraphs(), // content
  flow(randomArray, map(() => image.image()))(4), // images
  flow(sampleSize(sample(range(0, 40))), map(first))(users), // likeAddresses
  flow(sampleSize(sample(range(0, 40))), map(first))(users), // dislikeAddresses
  '', // ignore
  datatype.datetime(), // createdAt
];

const getNews = () => [
  datatype.number(), // id
  `${lorem.sentence()} ${lorem.sentence()}`, // title
  flow(sample, first)(users), // authorAddress
  lorem.paragraphs(), // content
  flow(randomArray, map(() => image.image()))(4), // images
  flow(sampleSize(sample(range(0, 40))), map(first))(users), // likeAddresses
  flow(sampleSize(sample(range(0, 40))), map(first))(users), // dislikeAddresses
  '', // ignore
  datatype.datetime(), // createdAt
  flow(randomArray, map(getViewpoint))(30), // viewpoints
];

export const news = map(getNews)(range(0, 20));
