import { GET_ALL as GET_ALL_USER } from 'shared/actions/user';
import { GET_ALL as GET_ALL_NEWS, CREATE, CREATE_VIEWPOINT } from 'shared/actions/news';
import Web3 from 'libs/web3.min';
import { map } from 'lodash/fp';
import abi from './breaking-news.abi';

const web3 = new Web3('ws://47.241.98.219:6790');

const contract = new web3.platon.Contract(
  abi,
  'lat1xezn8pp6vfaju8f47zh4dcxgt0nmqqhj9x703e',
  { vmType: 1 },
);

const waitForTransactionReceipt = (txHash) => new Promise((resolve, reject) => {
  const interval = setInterval(() => {
    web3.platon.getTransactionReceipt(txHash, (error, result) => {
      if (error) {
        reject(interval);
        clearInterval(interval);
      } else if (result) {
        resolve(result);
      }
    });
  }, 500);
});

const serializeViewpoint = ([
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

const deserializeViewpoint = ({
  title,
  newsId,
  content,
  images,
  isSupported,
  createdAt,
}) => [
  title,
  newsId,
  content,
  images,
  isSupported,
  createdAt,
];

const serializeNews = ([
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

const deserializeNews = ({
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

const serializeUser = ([
  address,
  credibility,
]) => ({
  address,
  credibility,
});

export default () => (next) => async (action) => {
  const { type, payload } = action;
  if (type === GET_ALL_USER) {
    const method = contract.methods.getUsers.apply(contract.methods, []);
    const result = await method.call();
    return next({ ...action, payload: map(serializeUser)(result) });
  }
  if (type === GET_ALL_NEWS) {
    const method = contract.methods.getNews.apply(contract.methods, []);
    const result = await method.call();
    return next({ ...action, payload: map(serializeNews)(result) });
  }
  if (type === CREATE) {
    const data = contract.methods.createNews(...deserializeNews(payload)).encodeABI();
    const txHash = await window.platon.request({
      method: 'platon_sendTransaction',
      params: [{
        data,
        from: window.platon.selectedAddress,
        to: contract.options.address,
      }],
    });
    return waitForTransactionReceipt(txHash);
  }
  if (type === CREATE_VIEWPOINT) {
    const data = contract.methods.createViewpoint(...deserializeViewpoint(payload)).encodeABI();
    const txHash = await window.platon.request({
      method: 'platon_sendTransaction',
      params: [{
        data,
        from: window.platon.selectedAddress,
        to: contract.options.address,
      }],
    });
    return waitForTransactionReceipt(txHash);
  }
  return next(action);
};
