import React from 'react';
import { object, func, node } from 'prop-types';
import { Provider as ReactReduxProvider } from 'react-redux';
import StyleContext from 'isomorphic-style-loader/StyleContext';
import { I18NContext } from 'relient/i18n';
import moment from 'moment/moment';

moment.locale('zh-cn');

const result = ({
  children,
  store,
  i18nContext,
  insertCss,
}) => (
  <StyleContext.Provider value={{ insertCss }}>
    <ReactReduxProvider store={store}>
      <I18NContext.Provider value={i18nContext}>
        {children}
      </I18NContext.Provider>
    </ReactReduxProvider>
  </StyleContext.Provider>
);

result.propTypes = {
  children: node,
  store: object.isRequired,
  i18nContext: func.isRequired,
  insertCss: func.isRequired,
};

result.displayName = __filename;

export default result;
