import React from 'react';
import { HOME } from 'shared/constants/features';
import Home from './home';
import News from './news';
import Create from './create';

export default () => [{
  feature: HOME,
  component: <Home />,
}, {
  path: '/:newsId',
  feature: HOME,
  action: ({ params: { newsId } }) => ({
    component: <News newsId={Number(newsId)} />,
  }),
}, {
  path: '/:newsId/create/:isSupport',
  feature: HOME,
  action: ({ params: { newsId, isSupport } }) => ({
    component: <Create newsId={Number(newsId)} isSupport={isSupport === 'true'} />,
  }),
}];
