import React, { useCallback } from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import { Row, Col, Button, Input, Affix } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { push } from 'relient/actions/history';
import { useDispatch } from 'react-redux';

import s from './header.less';

const result = () => {
  useStyles(s);
  const dispatch = useDispatch();
  const onAddNews = useCallback(() => {
    dispatch(push('/create'));
  }, []);
  const onLogoClick = useCallback(() => {
    dispatch(push('/'));
  }, []);

  return (
    <Affix offsetTop={0}>
      <div className={s.Root}>
        <Row className={s.Content} align="middle">
          <Col span={5} className={s.LogoContainer}>
            <div className={s.Logo} onClick={onLogoClick}>Breaking News</div>
          </Col>
          <Col span={14}>
            <Input className={s.Search} placeholder="搜索爆料" suffix={<SearchOutlined className={s.SearchIcon} />} size="large" />
          </Col>
          <Col span={5} className={s.ButtonContainer}>
            <Button
              type="primary"
              size="large"
              block
              onClick={onAddNews}
            >
              添加爆料
            </Button>
          </Col>
        </Row>
      </div>
    </Affix>
  );
};

result.propTypes = {};

result.displayName = __filename;

export default result;
