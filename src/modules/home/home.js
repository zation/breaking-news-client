import React from 'react';
import Layout from 'shared/components/layout';
import useStyles from 'isomorphic-style-loader/useStyles';

import s from './home.less';

const result = () => {
  useStyles(s);

  return (
    <Layout className={s.Root}>
      Home
    </Layout>
  );
};

result.displayName = __filename;

export default result;
