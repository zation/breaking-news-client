import React from 'react';
import ReactDOM from 'react-dom';
import queryString from 'query-string';
import { createPath } from 'history';
import createRouter from 'relient/create-router';
import {
  updateMeta,
  updateCustomMeta,
  updateLink,
} from 'relient/dom';
import deepForceUpdate from 'react-deep-force-update';
import getConfig from 'relient/config';
import App from 'shared/components/app';
import routes from 'modules/routes';
import i18n from 'relient/i18n';
import history from './history';
import store from './store';

const baseUrl = getConfig('baseUrl');
let router = createRouter({ routes, baseUrl });

const domainContext = {
  apiDomain: `${global.location.origin}/api`,
  cdnDomain: getConfig('cdnDomain'),
};
const i18nContext = i18n(global.messages);
const baseUrlContext = getConfig('baseUrl');

const insertCss = (...styles) => {
  // eslint-disable-next-line no-underscore-dangle
  const removeCss = styles.map((style) => style._insertCss());
  return () => removeCss.forEach((dispose) => dispose());
};

const container = document.getElementById('app');
let currentLocation = history.location;
let appInstance;

global.addEventListener('beforeunload', (event) => {
  if (global.isFormEditing) {
    const returnValue = i18nContext('confirmLeave');
    // eslint-disable-next-line no-param-reassign
    event.returnValue = returnValue;
    return returnValue;
  }
  return undefined;
});

// Switch off the native scroll restoration behavior and handle it manually
// https://developers.google.com/web/updates/2015/09/history-api-scroll-restoration
const scrollPositionsHistory = {};
if (window.history && 'scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

// Re-render the app when window.location changes
async function onLocationChange({ location, action }) {
  // Remember the latest scroll position for the previous location
  scrollPositionsHistory[currentLocation.key] = {
    scrollX: window.pageXOffset,
    scrollY: window.pageYOffset,
  };
  // Delete stored scroll position for next page if any
  if (action === 'PUSH') {
    delete scrollPositionsHistory[location.key];
  }
  currentLocation = location;

  const isInitialRender = !action;
  try {
    // Traverses the list of routes in the order they are defined until
    // it finds the first route that matches provided URL path string
    // and whose action method returns anything other than `undefined`.
    const route = await router.resolve({
      ...domainContext,
      baseUrl: baseUrlContext,
      i18n: i18nContext,
      store,
      pathname: location.pathname,
      query: queryString.parse(location.search),
      origin: global.location.origin,
    });

    // Prevent multiple page renders during the routing process
    if (currentLocation.key !== location.key) {
      return;
    }

    if (route.redirect) {
      history.replace(route.redirect);
      return;
    }

    const renderReactApp = isInitialRender ? ReactDOM.hydrate : ReactDOM.render;
    appInstance = renderReactApp(
      <App
        insertCss={insertCss}
        store={store}
        i18nContext={i18nContext}
      >
        {route.component}
      </App>,
      container,
      () => {
        if (isInitialRender) {
          const elem = document.getElementById('css');
          if (elem) elem.parentNode.removeChild(elem);
          return;
        }

        const { title, description, keywords, canonicalUrl, imageUrl } = route;
        if (title) {
          document.title = title;
        }
        if (description) {
          updateMeta('description', route.description);
        }
        if (keywords) {
          updateMeta('keywords', route.keywords);
        }
        if (canonicalUrl) {
          updateCustomMeta('og:url', route.canonicalUrl);
          updateLink('canonical', route.canonicalUrl);
        }
        if (imageUrl) {
          updateCustomMeta('og:image', route.imageUrl);
        }

        let scrollX = 0;
        let scrollY = 0;
        const pos = scrollPositionsHistory[location.key];
        if (pos) {
          scrollX = pos.scrollX;
          scrollY = pos.scrollY;
        } else {
          const targetHash = location.hash.substr(1);
          if (targetHash) {
            const target = document.getElementById(targetHash);
            if (target) {
              scrollY = window.pageYOffset + target.getBoundingClientRect().top;
            }
          }
        }

        // Restore the scroll position if it was saved into the state
        // or scroll to the given #hash anchor
        // or scroll to top of the page
        window.scrollTo(scrollX, scrollY);

        // Google Analytics tracking. Don't send 'pageview' event after
        // the initial rendering, as it was already sent
        if (window.ga) {
          window.ga('send', 'pageview', createPath(location));
        }
      },
    );
  } catch (error) {
    if (__DEV__) {
      throw error;
    }

    console.error(error);

    // Do a full page reload if error occurs during client-side navigation
    if (!isInitialRender && currentLocation.key === location.key) {
      window.location.reload();
    }
  }
}

// Handle client-side navigation by using HTML5 History API
// For more information visit https://github.com/mjackson/history#readme
history.listen(onLocationChange);
onLocationChange({ location: currentLocation });

// Enable Hot Module Replacement (HMR)
if (module.hot) {
  module.hot.accept('modules/routes', () => {
    // eslint-disable-next-line global-require
    router = createRouter({ routes: require('modules/routes').default, baseUrl });
    if (appInstance && appInstance.updater.isMounted(appInstance)) {
      // Force-update the whole tree, including components that refuse to update
      deepForceUpdate(appInstance);
    }

    onLocationChange({ location: currentLocation });
  });
}
