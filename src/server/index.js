import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import getConfig from 'relient/config';
import handleError from './middlewares/handle-error';
import render from './middlewares/render';
import healthCheck from './middlewares/health-check';
import logger from './logger';

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
