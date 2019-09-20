// import 'isomorphic-fetch';
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

// const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const injectHTML = (data, { html, title, meta, body, relayData }) => {
    data = data.replace('<html>', `<html ${html}>`);
    data = data.replace(/<title>.*?<\/title>/g, title);
    data = data.replace('</head>', `${meta}</head>`);
    data = data.replace(
      '<div id="root"></div>',
      `<div id="root">${body}</div><script>window.__RELAY_PAYLOADS__ = ${serialize(relayData, { isJSON: true })};</script>`
    );

    return data;
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

  fs.readFile(
    path.resolve(__dirname, '../build/index.html'),
    'utf8',
    (err, htmlData) => {
      // If there's an error... serve up something nasty
      if (err) {
        console.error('Read error', err);
        return res.status(500).end();
      }

      // We need to tell Helmet to compute the right meta tags, title, and such
      const helmet = Helmet.renderStatic();

      // Pass all this nonsense into our HTML formatting function above
      const html = injectHTML(htmlData, {
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
  );
}