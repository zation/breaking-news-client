export default {
  babelPlugins: [
    ['import', { libraryName: 'antd', style: false }],
    ['lodash', { id: ['lodash'] }],
  ],
  baseUrl: '/',
  proxies: [{
    from: ['/api/'],
    target: 'http://47.92.104.126/',
    changeOrigin: true,
    logLevel: 'debug',
  }],
};
