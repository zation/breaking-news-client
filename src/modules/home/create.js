import React, { useCallback, useState } from 'react';
import { string, bool } from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import Layout from 'shared/components/layout';
import useStyles from 'isomorphic-style-loader/useStyles';
import { Row, Col, Input, Form, Button, message } from 'antd';
import Uploader from 'shared/components/uploader';
import { map, flow, prop } from 'lodash/fp';
import { goBack } from 'relient/actions/history';
import { create as createNews, createViewpoint } from 'shared/actions/news';
import selector from './create-selector';

import s from './create.less';

const { TextArea } = Input;
const { Item } = Form;

const result = ({ newsId, isSupport }) => {
  useStyles(s);
  const {
    news,
  } = useSelector(selector(newsId));
  const dispatch = useDispatch();
  const [submitting, setSubmitting] = useState(false);

  const onBack = useCallback(() => {
    dispatch(goBack());
  }, []);

  const onSubmit = useCallback(async (values) => {
    setSubmitting(true);
    try {
      const finalValue = {
        ...values,
        images: flow(
          prop('images.fileList'),
          map(prop('response.Hash')),
        )(values),
        createdAt: new Date().toISOString(),
        isSupport,
        newsId,
      };
      if (newsId) {
        await dispatch(createViewpoint(finalValue));
        message.success('提交成功，请等待审核');
        return dispatch(goBack());
      }
      await dispatch(createNews(finalValue));
      message.success('提交成功，请等待审核');
      return dispatch(goBack());
    } catch (e) {
      console.error(e);
      setSubmitting(false);
    }
    return null;
  }, [newsId, isSupport]);

  return (
    <Layout className={s.Root}>
      <Row>
        <Col offset={5} span={14} className={s.Content}>
          <Row className={s.Title}>
            {news ? (
              <>
                <Col span={4} style={{ textAlign: 'right' }}>
                  {isSupport ? '支持' : '反对'}：
                </Col>
                <Col span={20}>
                  {news.title}
                </Col>
              </>
            ) : (
              <Col span={24} style={{ textAlign: 'center' }}>
                创建爆料
              </Col>
            )}
          </Row>
          <Form
            onFinish={onSubmit}
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
          >
            {!news && (
              <Item label="标题" name="title" rules={[{ required: true }]}>
                <Input />
              </Item>
            )}
            <Item label="内容" name="content" rules={[{ required: true }]}>
              <TextArea />
            </Item>
            <Item label="图片" name="images">
              <Uploader />
            </Item>
            <Item wrapperCol={{ offset: 4, span: 12 }}>
              <Button type="primary" size="large" htmlType="submit" className={s.Button} loading={submitting}>提交</Button>
              <Button size="large" onClick={onBack} className={s.Button}>返回</Button>
            </Item>
          </Form>
        </Col>
      </Row>
    </Layout>
  );
};

result.displayName = __filename;

result.propTypes = {
  newsId: string,
  isSupport: bool,
};

export default result;
