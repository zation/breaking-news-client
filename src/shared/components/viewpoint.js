import React from 'react';
import { object, bool, number } from 'prop-types';
import useStyles from 'isomorphic-style-loader/useStyles';
import {
  SafetyCertificateOutlined,
  CaretUpOutlined,
  LikeOutlined,
  DislikeOutlined,
} from '@ant-design/icons';
import { date } from 'relient/formatters';
import { map, size } from 'lodash/fp';
import { Button } from 'antd';

import s from './viewpoint.less';

const result = ({
  viewpoint: {
    author,
    title,
    content,
    images,
    likeAddresses = [],
    dislikeAddresses = [],
    createdAt,
  },
  canSupport = false,
  supportCount,
  notSupportCount,
}) => {
  useStyles(s);

  return (
    <div className={s.Root}>
      <div>
        <div><SafetyCertificateOutlined /></div>
        <div>{author.credibility}</div>

        <div><CaretUpOutlined /></div>
        <div>{size(likeAddresses) - size(dislikeAddresses)}</div>
        <div><CaretUpOutlined /></div>
      </div>

      <div>
        <div>{author.address} Created: {date()(createdAt)}</div>
        <div>{title}</div>
        <div>{content}</div>
        <div>
          {map((url) => (
            <img key={url} className={s.Image} src={url} alt={title} />
          ))(images)}
        </div>

        {canSupport && (
          <div>
            <Button className={s.Agree} type="primary"><LikeOutlined /> {supportCount} 支持</Button>
            <Button className={s.Disagree}><DislikeOutlined /> {notSupportCount} 反对</Button>
          </div>
        )}
      </div>
    </div>
  );
};

result.propTypes = {
  viewpoint: object.isRequired,
  canSupport: bool,
  supportCount: number,
  notSupportCount: number,
};

result.displayName = __filename;

export default result;
