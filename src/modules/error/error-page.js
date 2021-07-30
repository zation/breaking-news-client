import React from 'react';
import { shape, string } from 'prop-types';
import withStyles from 'isomorphic-style-loader/withStyles';

import s from './error-page.css';

export const ErrorPageWithoutStyle = ({ error }) => {
  if (__DEV__ && error) {
    return (
      <div>
        <h1>{error.name}</h1>
        <pre>{error.stack}</pre>
      </div>
    );
  }

  return (
    <div>
      <h1>Error</h1>
      <p>Sorry, a critical error occurred on this page.</p>
    </div>
  );
};

ErrorPageWithoutStyle.propTypes = {
  error: shape({
    name: string.isRequired,
    message: string.isRequired,
    stack: string.isRequired,
  }),
};

ErrorPageWithoutStyle.displayName = __filename;

export default withStyles(s)(ErrorPageWithoutStyle);
