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
import { map, includes } from 'lodash/fp';
import {
  deserializeViewpoint,
  serializeNews,
  deserializeNews,
  serializeUser,
} from './serializer';
import {
  contract,
  contractHexAddress,
  waitForTransactionResult,
  start,
} from './subscribe';

start();

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
    const txHash = await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [{
        data,
        from: window.ethereum.selectedAddress,
        to: contractHexAddress,
      }],
    });
    const result = await waitForTransactionResult(txHash);
    return next({ ...action, payload: result });
  }
  if (type === CREATE_VIEWPOINT) {
    const data = contract.methods.createViewPoint(...deserializeViewpoint(payload)).encodeABI();
    const txHash = await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [{
        data,
        from: window.ethereum.selectedAddress,
        to: contractHexAddress,
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
    const txHash = await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [{
        data,
        from: window.ethereum.selectedAddress,
        to: contractHexAddress,
      }],
    });
    const result = await waitForTransactionResult(txHash);
    return next({ ...action, payload: result });
  }
  return next(action);
};
