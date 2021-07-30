import { image, random, internet, datatype } from 'faker';
import { map, concat, range, flow, find, propEq } from 'lodash/fp';

const getAccount = (values) => ({
  id: datatype.number(),
  username: internet.email(),
  email: internet.email(),
  nickname: random.word(),
  avatar: image.avatar(),
  ...values,
});

export const currentAccount = getAccount({});

export const accounts = flow(
  map(getAccount),
  concat(currentAccount),
)(range(1, 40));

export default (router) => {
  router.get('/api/account/mine', (request, response) => {
    response.status(200).send(currentAccount);
  });

  router.post('/api/account', ({ body }, response) => {
    response.status(200).send(getAccount(body));
  });

  router.post('/api/account/:id/action/reset-password', (request, response) => {
    response.status(204).send();
  });

  router.post('/api/account/:id/action/activate', (request, response) => {
    response.status(204).send();
  });

  router.put('/api/account/:id', ({ body, params: { id } }, response) => {
    response.status(200).send({ ...body, id: Number(id) });
  });

  router.get('/api/account/all', (request, response) => {
    response.status(200).send({ content: accounts });
  });

  router.get('/api/account/:id', ({ params: { id } }, response) => {
    response.status(200).send(find(propEq('id', Number(id)))(accounts));
  });

  router.post('/api/account/action/register', ({ body }, response) => {
    response.status(200).send(getAccount({ ...body }));
  });

  router.post('/api/account/action/request-reset-password', (request, response) => {
    response.status(204).send();
  });

  router.post('/api/account/action/reset-password', (request, response) => {
    response.status(204).send();
  });
};
