import { map } from 'lodash/fp';

export const serializeViewpoint = ([
  isSupport,
  id,
  newsId,
  authorAddress,
  content,
  images,
  likeAddresses,
  dislikeAddresses,
  blockNumber,
  createdAt,
]) => ({
  isSupport,
  id,
  newsId,
  authorAddress,
  content,
  images,
  likeAddresses,
  dislikeAddresses,
  blockNumber,
  createdAt,
});

export const deserializeViewpoint = ({
  newsId,
  content,
  images,
  isSupport,
  createdAt,
}) => [
  newsId,
  content,
  images,
  isSupport,
  createdAt,
];

export const serializeNews = ([
  title,
  id,
  authorAddress,
  content,
  images,
  likeAddresses,
  dislikeAddresses,
  blockNumber,
  createdAt,
  viewpoints,
]) => ({
  title,
  id,
  authorAddress,
  content,
  images,
  likeAddresses,
  dislikeAddresses,
  blockNumber,
  createdAt,
  viewpoints: map(serializeViewpoint)(viewpoints),
});

export const deserializeNews = ({
  title,
  content,
  images,
  createdAt,
}) => [
  title,
  content,
  images,
  createdAt,
];

export const serializeUser = ([
  address,
  credibility,
]) => ({
  address,
  credibility,
});
