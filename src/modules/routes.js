const routes = [
  {
    path: '/',
    chunks: ['home'],
    load: () => import(/* webpackChunkName: 'home' */ 'modules/home'),
  },

  {
    path: '/(.*)',
    chunks: ['not-found'],
    load: () => import(/* webpackChunkName: 'not-found' */ 'modules/not-found'),
  },
];

// The error page is available by permanent url for development mode
if (__DEV__) {
  routes.unshift({
    path: '/error',
    // eslint-disable-next-line global-require
    action: require('./error').default,
  });
}

export default routes;
