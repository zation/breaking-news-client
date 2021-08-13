import { GET_ALL as GET_ALL_USER } from 'shared/actions/user';
import { GET_ALL as GET_ALL_NEWS, CREATE } from 'shared/actions/news';
import Web3 from 'libs/web3.min';
import abi from './breaking-news.abi';

const web3 = new Web3('ws://47.241.98.219:6790');

const contract = new web3.platon.Contract(
  abi,
  'lat1xezn8pp6vfaju8f47zh4dcxgt0nmqqhj9x703e',
  { vmType: 1 },
);

export default () => (next) => async (action) => {
  const { type, payload } = action;
  if (type === GET_ALL_USER) {
    const method = contract.methods.getUsers.apply(contract.methods, []);
    const result = await method.call();
    return next({ ...action, payload: result });
  }
  if (type === GET_ALL_NEWS) {
    const method = contract.methods.getNews.apply(contract.methods, []);
    const result = await method.call();
    return next({ ...action, payload: result });
  }
  if (type === CREATE) {
    const data = contract.methods.createNews(...payload).encodeABI();
    await window.platon.request({
      method: 'platon_sendTransaction',
      params: [{
        data,
        from: window.platon.selectedAddress,
        to: contract.options.address,
      }],
    });
  }
  return next(action);
};
