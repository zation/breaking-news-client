import React from 'react';
import { string } from 'prop-types';
import useStyles from 'isomorphic-style-loader/useStyles';
import classNames from 'classnames';

import s from './footer.less';

const result = ({ className }) => {
  useStyles(s);

  return (
    <div className={classNames(className, s.Root)}>
      Footer
    </div>
  );
};

result.propTypes = {
  className: string,
};

result.displayName = __filename;

export default result;
