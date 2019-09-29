import 'isomorphic-fetch';
import '@formatjs/intl-relativetimeformat/polyfill-locales';
import fs from 'fs';
import path from 'path';
import { getFarceResult } from 'found/lib/server';
import { Resolver } from 'found-relay';
import ReactDOMServer from 'react-dom/server';
import RelayServerSSR from 'react-relay-network-modern-ssr/lib/server';
import serialize from 'serialize-javascript';
import Helmet from 'react-helmet';

import createRelayEnvironment from './relay/createRelayEnvironment.js';
import { historyMiddlewares, routeConfig } from './router.js';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const injectHTML = ({ html, title, meta, body, relayData }) => {
    return `<!doctype html>
      <html ${html}>
      <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta charset="utf-8" />
        ${title}
        <meta name="viewport" content="width=device-width, initial-scale=1">
        ${
        assets.client.css
          ? `<link rel="stylesheet" href="${assets.client.css}">`
          : ''
        }
        ${
        process.env.NODE_ENV === 'production'
          ? `<script src="${assets.client.js}" defer></script>`
          : `<script src="${assets.client.js}" defer crossorigin></script>`
        }
        ${meta}
      </head>
      <body>
        <section id="root">${body}</section>
        <script>window.__RELAY_PAYLOADS__ = ${serialize(relayData, { isJSON: true })};</script>
      </body>
    </html>`;
  };

export default async (req, res) => {
  const relaySsr = new RelayServerSSR();

  const { redirect, status, element } = await getFarceResult({
    url: req.url,
    historyMiddlewares,
    routeConfig,
    resolver: new Resolver(
      createRelayEnvironment(relaySsr, `http://queplanta.com/graphql`),
    ),
  });

  if (redirect) {
    res.redirect(302, redirect.url);
    return;
  }

  const appHtml = ReactDOMServer.renderToString(element);
  const relayData = await relaySsr.getCache();

  // We need to tell Helmet to compute the right meta tags, title, and such
  const helmet = Helmet.renderStatic();

  // Pass all this nonsense into our HTML formatting function above
  const html = injectHTML({
    html: helmet.htmlAttributes.toString(),
    title: helmet.title.toString(),
    meta: helmet.meta.toString(),
    body: appHtml,
    relayData: relayData,
    // scripts: extraChunks,
    // state: JSON.stringify(store.getState()).replace(/</g, '\\u003c')
  });

  // We have all the final HTML, let's send it to the user already!
  res.send(html);
}