import React from 'react';
import ReactDOM from 'react-dom/server';
import { getEntity } from 'relient/selectors';
import getConfig from 'relient/config';
import getPreloader from 'shared/utils/preloader';
import App from 'shared/components/app';
import { compact, concat, flow, reduce } from 'lodash/fp';
import createRouter from 'relient/create-router';
import routes from 'modules/routes';
import i18n from 'relient/i18n';
import { setUserAgent } from 'shared/actions/global';
import { getCurrentAccount } from 'shared/selectors/account';
import createStore from '../create-store';
import chunks from './chunk-manifest.json'; // eslint-disable-line import/no-unresolved
import Html from '../html';

const router = createRouter({ routes, baseUrl: getConfig('baseUrl') });

const getChunks = (route) => {
  if (route.parent) {
    return [...(route.chunks || []), ...getChunks(route.parent)];
  }
  return route.chunks || [];
};

export default async (req, res, next) => {
  try {
    const { protocol } = req;
    const origin = `${protocol}://${req.get('host')}`;
    const store = createStore({});

    const { dispatch } = store;

    try {
      let preloader = [];

      const state = store.getState();
      const isLogin = getEntity('auth.isLogin')(state);
      if (isLogin) {
        preloader = [
          ...preloader,
          ...getPreloader(
            getCurrentAccount(state),
            dispatch,
          ),
        ];
      }
      await Promise.all(preloader);
    } catch (error) {
      console.error('preloader error ---> ', error);
    }

    const domainContext = {
      apiDomain: getConfig('serverAPIDomain'),
      cdnDomain: getConfig('cdnDomain'),
    };

    const messages = {};
    const i18nContext = i18n(messages);
    const baseUrl = getConfig('baseUrl');
    dispatch(setUserAgent(req.headers['user-agent']));

    const route = await router.resolve({
      ...domainContext,
      baseUrl,
      i18n: i18nContext,
      store,
      pathname: req.path,
      query: req.query,
      origin,
    });

    if (res.headersSent) {
      return;
    }

    if (route.redirect) {
      res.redirect(route.status || 302, route.redirect);
      return;
    }

    const css = new Set(); // CSS for all rendered React components
    // eslint-disable-next-line no-underscore-dangle
    const insertCss = (...styles) => styles.forEach((style) => css.add(style._getCss()));
    const children = ReactDOM.renderToString(
      <App
        insertCss={insertCss}
        store={store}
        i18nContext={i18nContext}
      >
        {route.component}
      </App>,
    );
    const { title, description } = route;

    const html = ReactDOM.renderToStaticMarkup(
      <Html
        title={title}
        description={description}
        styles={[{
          id: 'css',
          cssText: [...css].join(''),
        }]}
        scripts={flow(
          getChunks,
          reduce((result, chunk) => result.concat(chunks[chunk]), []),
          concat(chunks.client),
          compact,
        )(route)}
        initialState={JSON.stringify(store.getState())}
        messages={JSON.stringify(messages)}
        exchangeRate={JSON.stringify(global.exchangeRate)}
      >
        {children}
      </Html>,
    );
    res.status(route.status || 200);
    res.send(`<!doctype html>${html}`);
  } catch (err) {
    next(err);
  }
};
