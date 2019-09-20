import escapeStringRegexp from 'escape-string-regexp';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

import { getFarceResult } from 'found/lib/server';
import { Resolver } from 'found-relay';
import RelayServerSSR from 'react-relay-network-modern-ssr/lib/server';
import serialize from 'serialize-javascript';

import createRelayEnvironment from '../../relay/createRelayEnvironment';
import { historyMiddlewares, routeConfig } from '../../router';

const renderMiddleware = () => async (req, res) => {
  const relaySsr = new RelayServerSSR();
  // new RelayClientSSR(window.__RELAY_PAYLOADS__),

  let html = req.html;

  const { redirect, status, element } = await getFarceResult({
    url: req.url,
    historyMiddlewares,
    routeConfig,
    resolver: new Resolver(
      createRelayEnvironment(relaySsr, `/graphql`),
    ),
  });

  if (redirect) {
    res.redirect(302, redirect.url);
    return;
  }

  const htmlContent = ReactDOMServer.renderToString(element);
  const relayData = await relaySsr.getCache();

  const htmlReplacements = {
    HTML_CONTENT: htmlContent,
    RELAY_DATA: serialize(relayData, { isJSON: true }),
  };

  Object.keys(htmlReplacements).forEach(key => {
    const value = htmlReplacements[key];
    html = html.replace(
      new RegExp('__' + escapeStringRegexp(key) + '__', 'g'),
      value
    );
  });

  res.send(html);
};

// const renderMiddleware = () => async (req, res) => {
//   const relaySsr = new RelayServerSSR();

//   const { redirect, status, element } = await getFarceResult({
//     url: req.url,
//     historyMiddlewares,
//     routeConfig,
//     resolver: new Resolver(
//       createRelayEnvironment(relaySsr, `http://localhost:${PORT}/graphql`),
//     ),
//   });

//   if (redirect) {
//     res.redirect(302, redirect.url);
//     return;
//   }

//   const appHtml = ReactDOMServer.renderToString(element);
//   const relayData = await relaySsr.getCache();

//   res.status(status).send(`
// <!DOCTYPE html>
// <html>
// <head>
//   <meta charset="utf-8">
//   <title>Relay • TodoMVC</title>
//   <link rel="stylesheet" href="base.css">
//   <link rel="stylesheet" href="index.css">
// </head>
// <body>
// <div id="root">${appHtml}</div>
// <script>
//   window.__RELAY_PAYLOADS__ = ${serialize(relayData, { isJSON: true })};
// </script>
// <script src="/bundle.js"></script>
// </body>
// </html>
//   `);
// }

export default renderMiddleware;
