import React, { useEffect } from 'react';
import Layout from 'shared/components/layout';
import useStyles from 'isomorphic-style-loader/useStyles';
import abi from './abi';

import s from './home.less';

const result = () => {
  useStyles(s);
  useEffect(() => {
    if (__BROWSER__) {
      const run = async () => {
        // eslint-disable-next-line global-require
        const Web3 = require('libs/web3.min');
        const web3 = new Web3('ws://47.241.98.219:6790');
        const contract = new web3.platon.Contract(
          abi,
          'lat1uqk8pk58rw2kde9wts7k9ctmfahz84afn46vgr',
          { vmType: 1 },
        );
        const method = contract.methods.testU128Return.apply(contract.methods, []);
        const a = await method.call();
        // eslint-disable-next-line no-console
        console.log(a);
      };
      run();
    }
  }, []);

  return (
    <Layout className={s.Root}>
      Home
    </Layout>
  );
};

result.displayName = __filename;

export default result;
