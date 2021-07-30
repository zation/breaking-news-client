import React from 'react';
import { string, node, bool } from 'prop-types';
import useStyles from 'isomorphic-style-loader/useStyles';
// eslint-disable-next-line css-modules/no-unused-class
import globalStyle from './global_.less';
import s from './layout.less';
import Footer from './footer';
import Header from './header';

const result = ({
  children,
  className,
}) => {
  useStyles(globalStyle, s);

  return (
    <div>
      <Header />

      <div className={className}>
        {children}
      </div>

      <Footer />
    </div>
  );
};

result.propTypes = {
  children: node,
  className: string,
  title: node,
  subTitle: string,
  multipleCard: bool,
  dark: bool,
  grey: bool,
};

result.displayName = __filename;

export default result;
