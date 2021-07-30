import React from 'react';
import { string, arrayOf, shape } from 'prop-types';
import clientConfig from 'relient/config/client-config';

/* eslint-disable react/no-danger */

const result = ({
  title = 'Tipster',
  description = 'Tipster',
  styles = [],
  scripts = [],
  messages,
  children,
  initialState,
  exchangeRate,
}) => (
  <html className="no-js" lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      {scripts.map((script) => (
        <link key={script} rel="preload" href={script} as="script" />
      ))}
      {styles.map((style) => (
        <style
          key={style.id}
          id={style.id}
          dangerouslySetInnerHTML={{ __html: style.cssText }}
        />
      ))}
    </head>
    <body>
      <div id="app" dangerouslySetInnerHTML={{ __html: children }} />
      <script dangerouslySetInnerHTML={{ __html: clientConfig(['cdnDomain', 'baseUrl']) }} />
      <script dangerouslySetInnerHTML={{ __html: `window.__INITIAL_STATE__=${initialState}` }} />
      <script dangerouslySetInnerHTML={{ __html: `window.messages=${messages}` }} />
      <script dangerouslySetInnerHTML={{ __html: `window.exchangeRate=${exchangeRate}` }} />
      {scripts.map((script) => <script key={script} src={script} />)}
    </body>
  </html>
);

result.propTypes = {
  title: string,
  description: string,
  styles: arrayOf(
    shape({
      id: string.isRequired,
      cssText: string.isRequired,
    }).isRequired,
  ),
  scripts: arrayOf(string.isRequired),
  children: string.isRequired,
  initialState: string,
  messages: string.isRequired,
  exchangeRate: string.isRequired,
};

result.displayName = __filename;

export default result;
