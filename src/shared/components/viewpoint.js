import React from 'react';
import { object, bool, number, string } from 'prop-types';
import useStyles from 'isomorphic-style-loader/useStyles';
import {
  SafetyCertificateOutlined,
  CaretUpOutlined,
  LikeOutlined,
  DislikeOutlined,
} from '@ant-design/icons';
import { date } from 'relient/formatters';
import { map, size, includes } from 'lodash/fp';
import { Button } from 'antd';
import classNames from 'classnames';

import s from './viewpoint.less';

const SECURE_CREDIBILITY = 0;

const result = ({
  viewpoint: {
    author = {},
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
  currentUserAddress,
}) => {
  useStyles(s);

  return (
    <div className={s.Root}>
      <div className={s.Numbers}>
        <div>
          <SafetyCertificateOutlined
            className={classNames(s.SecurityIcon, {
              [s.secure]: author.credibility >= SECURE_CREDIBILITY,
            })}
          />
        </div>
        <div className={s.Number} style={{ marginBottom: 20 }}>{author.credibility}</div>
        <div>
          <CaretUpOutlined
            className={classNames(s.UpIcon, {
              [s.active]: includes(currentUserAddress)(likeAddresses),
            })}
          />
        </div>
        <div className={s.Number}>{size(likeAddresses) - size(dislikeAddresses)}</div>
        <div>
          <CaretUpOutlined
            className={classNames(s.DownIcon, {
              [s.active]: includes(currentUserAddress)(dislikeAddresses),
            })}
          />
        </div>
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
            <Button className={s.Support} type="primary"><LikeOutlined /> {supportCount} 支持</Button>
            <Button className={s.NotSupport}><DislikeOutlined /> {notSupportCount} 反对</Button>
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
  currentUserAddress: string,
};

result.displayName = __filename;

export default result;
