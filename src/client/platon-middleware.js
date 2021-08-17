import { GET_ALL as GET_ALL_USER } from 'shared/actions/user';
import {
  GET_ALL as GET_ALL_NEWS,
  CREATE,
  CREATE_VIEWPOINT,
  LIKE,
  LIKE_VIEWPOINT,
  DISLIKE,
  DISLIKE_VIEWPOINT,
  CANCEL_LIKE,
  CANCEL_LIKE_VIEWPOINT,
  CANCEL_DISLIKE,
  CANCEL_DISLIKE_VIEWPOINT,
} from 'shared/actions/news';
import Web3 from 'libs/web3.min';
import { map, includes } from 'lodash/fp';
import { decode } from 'micro-rlp';
import buffer from 'buffer/';
import abi from './breaking-news.abi';
import {
  deserializeViewpoint,
  serializeNews,
  deserializeNews,
  serializeUser,
} from './serializer';

const web3 = new Web3('ws://47.241.98.219:6790');
const newsPromiseMap = new Map();
const contract = new web3.platon.Contract(
  abi,
  'lat1af6hck97pxzsc8wekx42vx6r3mfc25t65szakz',
  { vmType: 1 },
);
const addNewsTopic = web3.utils.leftPad(web3.utils.toHex('AddNews'), 64);
web3.platon.subscribe('logs', {
  address: contract.options.address,
  topics: [addNewsTopic],
}, async (error, result) => {
  if (error) {
    console.error(error);
    return;
  }
  const receipt = await web3.platon.getTransactionReceipt(result.transactionHash);
  const promise = newsPromiseMap.get(result.transactionHash);
  if (receipt && promise) {
    newsPromiseMap.delete(result.transactionHash);
    if (receipt.status) {
      const decodedData = decode(buffer.Buffer.from(result.data.replace('0x', ''), 'hex'));
      const news = web3.platon.abi.decodeParameters([{ type: 'News' }], decodedData[0]);
      promise.resolve(serializeNews(news));
    } else {
      promise.reject();
    }
  }
});
const otherTopics = map((event) => web3.utils.leftPad(web3.utils.toHex(event), 64))([
  'BNMessage',
]);
web3.platon.subscribe('logs', {
  address: contract.options.address,
  topics: otherTopics,
}, async (error, result) => {
  if (error) {
    console.error(error);
    return;
  }
  const receipt = await web3.platon.getTransactionReceipt(result.transactionHash);
  const promise = newsPromiseMap.get(result.transactionHash);
  if (receipt && promise) {
    newsPromiseMap.delete(result.transactionHash);
    if (receipt.status) {
      const resultString = web3.platon.abi.decodeParameters([{ type: 'string' }], result.data.replace('0x', ''));
      if (resultString === 'success') {
        promise.resolve();
      } else {
        promise.reject(resultString);
      }
    } else {
      promise.reject();
    }
  }
});
const waitForTransactionResult = (txHash) => new Promise((resolve, reject) => {
  newsPromiseMap.set(txHash, { resolve, reject });
});

const methodMap = {
  [LIKE]: 'likeNews',
  [DISLIKE]: 'dislikeNews',
  [CANCEL_LIKE]: 'cancellikeNews',
  [CANCEL_DISLIKE]: 'canceldislikeNews',
  [LIKE_VIEWPOINT]: 'likeViewpoint',
  [DISLIKE_VIEWPOINT]: 'dislikeViewpoint',
  [CANCEL_LIKE_VIEWPOINT]: 'cancellikeViewpoint',
  [CANCEL_DISLIKE_VIEWPOINT]: 'canceldislikeViewpoint',
};

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
    const result = await waitForTransactionResult(txHash);
    return next({ ...action, payload: result });
  }
  if (type === CREATE_VIEWPOINT) {
    const data = contract.methods.createViewPoint(...deserializeViewpoint(payload)).encodeABI();
    const txHash = await window.platon.request({
      method: 'platon_sendTransaction',
      params: [{
        data,
        from: window.platon.selectedAddress,
        to: contract.options.address,
      }],
    });
    const result = await waitForTransactionResult(txHash);
    return next({ ...action, payload: result });
  }
  if (includes(type)([
    LIKE,
    LIKE_VIEWPOINT,
    DISLIKE,
    DISLIKE_VIEWPOINT,
    CANCEL_LIKE,
    CANCEL_LIKE_VIEWPOINT,
    CANCEL_DISLIKE,
    CANCEL_DISLIKE_VIEWPOINT,
  ])) {
    const data = contract.methods[methodMap[type]](payload).encodeABI();
    const txHash = await window.platon.request({
      method: 'platon_sendTransaction',
      params: [{
        data,
        from: window.platon.selectedAddress,
        to: contract.options.address,
      }],
    });
    const result = await waitForTransactionResult(txHash);
    return next({ ...action, payload: result });
  }
  return next(action);
};
