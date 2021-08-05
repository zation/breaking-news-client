import React from 'react';
import { useSelector } from 'react-redux';
import Layout from 'shared/components/layout';
import useStyles from 'isomorphic-style-loader/useStyles';
import { Row, Col } from 'antd';
import Viewpoint from 'shared/components/viewpoint';
import { map } from 'lodash/fp';
import selector from './home-selector';
// import abi from './abi';

import s from './home.less';

const result = () => {
  useStyles(s);
  // useEffect(() => {
  //   if (__BROWSER__) {
  //     const run = async () => {
  //       // eslint-disable-next-line global-require
  //       const Web3 = require('libs/web3.min');
  //       const web3 = new Web3('ws://47.241.98.219:6790');
  //       const contract = new web3.platon.Contract(
  //         abi,
  //         'lat1uqk8pk58rw2kde9wts7k9ctmfahz84afn46vgr',
  //         { vmType: 1 },
  //       );
  //       const method = contract.methods.testU128Return.apply(contract.methods, []);
  //       const a = await method.call();
  //       // eslint-disable-next-line no-console
  //       console.log(a);
  //     };
  //     run();
  //   }
  // }, []);
  const {
    news,
    currentUserAddress,
  } = useSelector(selector);

  return (
    <Layout className={s.Root}>
      <Row>
        <Col offset={5} span={14} className={s.Content}>
          {map((newsItem) => (
            <Viewpoint
              currentUserAddress={currentUserAddress}
              key={newsItem.id}
              viewpoint={newsItem}
              canSupport
              supportCount={newsItem.supportCount}
              notSupportCount={newsItem.notSupportCount}
            />
          ))(news)}
        </Col>
      </Row>
    </Layout>
  );
};

result.displayName = __filename;

export default result;
