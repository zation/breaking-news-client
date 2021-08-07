import React from 'react';
import { number } from 'prop-types';
import { useSelector } from 'react-redux';
import Layout from 'shared/components/layout';
import useStyles from 'isomorphic-style-loader/useStyles';
import { Row, Col } from 'antd';
import Viewpoint from 'shared/components/viewpoint';
import { map } from 'lodash/fp';
import selector from './news-selector';

import s from './news.less';

const result = ({ newsId }) => {
  useStyles(s);
  const {
    news,
    currentUserAddress,
  } = useSelector(selector(newsId));

  return (
    <Layout className={s.Root}>
      <Row>
        <Col offset={5} span={14} className={s.Content}>
          <Viewpoint
            currentUserAddress={currentUserAddress}
            viewpoint={news}
            hasOperations
            supportCount={news.supportCount}
            notSupportCount={news.notSupportCount}
          />
          <div className={s.Separator}>
            支持与反对
          </div>
          {map((viewpoint) => (
            <Viewpoint
              currentUserAddress={currentUserAddress}
              key={viewpoint.id}
              viewpoint={viewpoint}
              showTag
            />
          ))(news.viewpoints)}
        </Col>
      </Row>
    </Layout>
  );
};

result.displayName = __filename;

result.propTypes = {
  newsId: number.isRequired,
};

export default result;
