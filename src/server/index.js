import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import getConfig from 'relient/config';
import { find, flow, prop, propEq } from 'lodash/fp';
import handleError from './middlewares/handle-error';
import render from './middlewares/render';
import healthCheck from './middlewares/health-check';
import logger from './logger';

const defaultExchangeRate = {
  USDtoJPY: 111.22,
  USDtoCNY: 6.8,
  USDtoKRW: 1114.33,
  USDtoBTC: 0.00015,
  USDtoBCH: 0.0019,
};
global.exchangeRate = defaultExchangeRate;

const updateExchangeRate = async () => {
  const response = await fetch(`${getConfig('serverAPIDomain')}/exchange-rate/all`);
  const exchangeRates = await response.json();
  global.exchangeRate.USDtoJPY = flow(find(propEq('name', 'JPY')), prop('rate'))(exchangeRates);
  global.exchangeRate.USDtoCNY = flow(find(propEq('name', 'CNY')), prop('rate'))(exchangeRates);
  global.exchangeRate.USDtoKRW = flow(find(propEq('name', 'KRW')), prop('rate'))(exchangeRates);
  global.exchangeRate.USDtoBTC = flow(find(propEq('name', 'BTC')), prop('rate'))(exchangeRates);
  global.exchangeRate.USDtoBCH = flow(find(propEq('name', 'BCH')), prop('rate'))(exchangeRates);
  global.exchangeRate = { ...defaultExchangeRate, ...global.exchangeRate };
};

const HALF_HOUR = 1000 * 60 * 30;
updateExchangeRate();
setInterval(updateExchangeRate, HALF_HOUR);

const app = express();

//
// Tell any CSS tooling (such as Material UI) to use all vendor prefixes if the
// user agent is not known.
// -----------------------------------------------------------------------------
global.navigator = global.navigator || {};
global.navigator.userAgent = global.navigator.userAgent || 'all';

if (__DEV__) {
  app.use(morgan('tiny'));
  app.enable('trust proxy');
}

const publicPath = __DEV__ ? path.resolve(__dirname, '..', 'public') : path.resolve(__dirname, 'public');
app.use(getConfig('baseUrl'), express.static(publicPath));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/healthCheck', (req, res, next) => healthCheck(req, res, next));
app.get('*', (req, res, next) => render(req, res, next));
app.use((err, req, res, next) => handleError(err, req, res, next));

//
// Launch the server
// -----------------------------------------------------------------------------
if (!module.hot) {
  app.listen(getConfig('port'), () => {
    logger.info(`The server is running at http://localhost:${getConfig('port')}/`);
  });
}

//
// Hot Module Replacement
// -----------------------------------------------------------------------------
if (module.hot) {
  app.hot = module.hot;
  module.hot.accept('./middlewares/render');
  module.hot.accept('./middlewares/handle-error');
}

export default app;
