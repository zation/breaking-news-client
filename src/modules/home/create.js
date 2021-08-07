import React, { useCallback } from 'react';
import { number, bool } from 'prop-types';
import { useSelector } from 'react-redux';
import Layout from 'shared/components/layout';
import useStyles from 'isomorphic-style-loader/useStyles';
import { Row, Col, Input, Form, Button } from 'antd';
import Uploader from 'shared/components/uploader';
import { map, flow, prop } from 'lodash/fp';
import selector from './news-selector';

import s from './create.less';

const { TextArea } = Input;
const { Item } = Form;

const result = ({ newsId, isSupport }) => {
  useStyles(s);
  const {
    news,
    // currentUserAddress,
  } = useSelector(selector(newsId));

  const onSubmit = useCallback((values) => {
    const finalValue = {
      ...values,
      images: flow(
        prop('images.fileList'),
        map(prop('response.Hash')),
      )(values),
      createdAt: new Date().toISOString(),
      isSupport,
      newsID: newsId,
    };
    // eslint-disable-next-line no-console
    console.log(finalValue);
  }, [newsId, isSupport]);

  return (
    <Layout className={s.Root}>
      <Row>
        <Col offset={5} span={14} className={s.Content}>
          {news && (
            <Row className={s.Title}>
              <Col span={4} style={{ textAlign: 'right' }}>
                {isSupport ? '支持' : '反对'}：
              </Col>
              <Col span={20}>
                {news.title}
              </Col>
            </Row>
          )}
          <Form
            onFinish={onSubmit}
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
          >
            <Item label="标题" name="title" rules={[{ required: true }]}>
              <Input />
            </Item>
            <Item label="内容" name="content" rules={[{ required: true }]}>
              <TextArea />
            </Item>
            <Item label="图片" name="images">
              <Uploader />
            </Item>
            <Item wrapperCol={{ offset: 4, span: 8 }}>
              <Button type="primary" size="large" htmlType="submit" block>提交</Button>
            </Item>
          </Form>
        </Col>
      </Row>
    </Layout>
  );
};

result.displayName = __filename;

result.propTypes = {
  newsId: number,
  isSupport: bool,
};

export default result;
