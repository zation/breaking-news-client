import React from 'react';
import { func } from 'prop-types';
import { Upload } from 'antd';

const result = ({ onChange }) => (
  <Upload
    listType="picture-card"
    action="http://127.0.0.1:5001/api/v0/add"
    onChange={onChange}
  >
    点击上传图片
  </Upload>
);

result.propTypes = {
  onChange: func.isRequired,
};

result.displayName = __filename;

export default result;
