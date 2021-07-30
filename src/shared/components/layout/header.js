import React from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';

import s from './header.less';

const result = () => {
  useStyles(s);

  return (
    <div className={s.Root}>
      Header
    </div>
  );
};

result.propTypes = {};

result.displayName = __filename;

export default result;
