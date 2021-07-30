import React from 'react';
import ReactDOM from 'react-dom/server';
import errorPageStyle from 'modules/error/error-page.css';

import { ErrorPageWithoutStyle } from 'modules/error/error-page';
import Html from '../html';
import logger from '../logger';

// eslint-disable-next-line no-unused-vars
export default (err, req, res, next) => {
  logger.error(err);

  const html = ReactDOM.renderToStaticMarkup(
    <Html
      title="Internal Server Error"
      description={err.message}
      styles={[{ id: 'css', cssText: errorPageStyle._getCss() }]} // eslint-disable-line no-underscore-dangle
    >
      {ReactDOM.renderToString(<ErrorPageWithoutStyle error={err} />)}
    </Html>,
  );
  res.status(err.status || 500);
  res.send(`<!doctype html>${html}`);
};
