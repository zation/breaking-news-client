import React, { useCallback } from 'react';
import { object, bool, number, string, func } from 'prop-types';
import useStyles from 'isomorphic-style-loader/useStyles';
import {
  SafetyCertificateOutlined,
  CaretUpOutlined,
  LikeOutlined,
  DislikeOutlined,
} from '@ant-design/icons';
import { date } from 'relient/formatters';
import { map, size, includes, flow, slice, identity } from 'lodash/fp';
import { Button } from 'antd';
import classNames from 'classnames';
import { push } from 'relient/actions/history';
import { useDispatch } from 'react-redux';

import s from './viewpoint.less';

const SECURE_CREDIBILITY = 0;

const result = ({
  viewpoint: {
    id,
    author = {},
    title,
    content,
    images,
    likeAddresses = [],
    dislikeAddresses = [],
    createdAt,
  },
  hasOperations = false,
  canClickTitle = false,
  supportCount,
  notSupportCount,
  currentUserAddress,
  dislike,
  like,
  maxImages,
}) => {
  useStyles(s);
  const dispatch = useDispatch();
  const isLiked = includes(currentUserAddress)(likeAddresses);
  const isDisliked = includes(currentUserAddress)(dislikeAddresses);

  const onLike = useCallback(() => {
    if (!isLiked && !isDisliked) {
      like(id);
    }
  }, [isLiked, isDisliked, id]);

  const onDislike = useCallback(() => {
    if (!isLiked && !isDisliked) {
      dislike(id);
    }
  }, [isLiked, isDisliked, id]);

  const onTitleClick = useCallback(() => {
    dispatch(push(`/${id}`));
  }, [id]);

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
            onClick={onLike}
            className={classNames(s.UpIcon, {
              [s.active]: isLiked,
            })}
          />
        </div>
        <div className={s.Number}>{size(likeAddresses) - size(dislikeAddresses)}</div>
        <div>
          <CaretUpOutlined
            onClick={onDislike}
            className={classNames(s.DownIcon, {
              [s.active]: isDisliked,
            })}
          />
        </div>
      </div>

      <div>
        <div>
          <span className={s.Address}>{author.address}</span>
          <span className={s.lighten}>Created</span>: {date()(createdAt)}
        </div>
        <div className={s.Title} onClick={canClickTitle ? onTitleClick : null}>{title}</div>
        <div className={s.Content}>{content}</div>
        <div className={s.Images}>
          {flow(
            maxImages >= 0 ? slice(0, maxImages) : identity,
            map((url) => (
              <img key={url} className={s.Image} src={url} alt={title} />
            )),
          )(images)}
        </div>

        {hasOperations && (
          <div className={s.Operations}>
            <Button
              size="large"
              type="primary"
              className={s.Support}
              icon={<LikeOutlined />}
            >
              {supportCount} 支持
            </Button>
            <Button
              size="large"
              className={s.NotSupport}
              icon={<DislikeOutlined />}
            >
              {notSupportCount} 反对
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

result.propTypes = {
  viewpoint: object.isRequired,
  hasOperations: bool,
  supportCount: number,
  notSupportCount: number,
  currentUserAddress: string,
  like: func.isRequired,
  dislike: func.isRequired,
  maxImages: number,
  canClickTitle: bool,
};

result.displayName = __filename;

export default result;
