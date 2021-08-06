import React from 'react';
import { HOME } from 'shared/constants/features';
import Home from './home';
import News from './news';

export default () => [{
  feature: HOME,
  component: <Home />,
}, {
  path: '/:newsId',
  feature: HOME,
  action: ({ params: { newsId } }) => ({
    component: <News newsId={Number(newsId)} />,
  }),
}];
