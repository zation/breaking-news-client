import React from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import { Row, Col, Button, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import s from './header.less';

const result = () => {
  useStyles(s);

  return (
    <div className={s.Root}>
      <Row className={s.Content} align="middle">
        <Col span={5} className={s.LogoContainer}>
          <div className={s.Logo}>Breaking News</div>
        </Col>
        <Col span={14}>
          <Input className={s.Search} placeholder="搜索爆料" suffix={<SearchOutlined className={s.SearchIcon} />} size="large" />
        </Col>
        <Col span={5} className={s.ButtonContainer}>
          <Button type="primary" size="large" block>添加爆料</Button>
        </Col>
      </Row>
    </div>
  );
};

result.propTypes = {};

result.displayName = __filename;

export default result;
