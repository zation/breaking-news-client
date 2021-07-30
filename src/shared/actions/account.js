import { createAction, actionTypeCreator, post } from 'relient/actions';

const actionType = actionTypeCreator(__filename);

export const REGISTER = actionType('REGISTER');

export const register = createAction(
  REGISTER, ({
    username,
    password,
    captcha,
  }) => post('/account/action/register', {
    username,
    password,
    captcha,
  }),
  () => ({ withoutAuth: true, ignoreAuthRedirection: true }),
);
