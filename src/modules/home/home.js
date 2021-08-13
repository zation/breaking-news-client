import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Layout from 'shared/components/layout';
import useStyles from 'isomorphic-style-loader/useStyles';
import { Row, Col } from 'antd';
import Viewpoint from 'shared/components/viewpoint';
import { map } from 'lodash/fp';
import { getAll } from 'shared/actions/news';
import selector from './home-selector';

import s from './home.less';

const result = () => {
  useStyles(s);
  const {
    news,
    currentUserAddress,
  } = useSelector(selector);
  const dispatch = useDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(getAll());
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Layout className={s.Root}>
      <Row>
        <Col offset={5} span={14} className={s.Content}>
          {map((newsItem) => (
            <Viewpoint
              currentUserAddress={currentUserAddress}
              key={newsItem.id}
              viewpoint={newsItem}
              hasOperations
              supportCount={newsItem.supportCount}
              notSupportCount={newsItem.notSupportCount}
              maxImages={1}
            />
          ))(news)}
        </Col>
      </Row>
    </Layout>
  );
};

result.displayName = __filename;

export default result;
