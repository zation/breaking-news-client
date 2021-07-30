import React from 'react';
import { string } from 'prop-types';
import Layout from 'shared/components/layout';
import useStyles from 'isomorphic-style-loader/useStyles';

import s from './not-found.css';

const result = ({ title }) => {
  useStyles(s);

  return (
    <Layout title={title}>
      <div className={s.Container}>
        <p>Sorry, the page you were trying to view does not exist.</p>
      </div>
    </Layout>
  );
};

result.propTypes = {
  title: string,
};

result.displayName = __filename;

export default result;
