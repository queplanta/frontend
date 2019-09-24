import React from 'react';
import express from 'express';
import proxy from 'express-http-proxy';
import serverRender from './serverRender.js';

const server = express();
server
  .disable('x-powered-by')
  .use('/graphql', proxy('http://queplanta.com', {
    proxyReqPathResolver: () => ('/graphql')
  }))
  .use('/public', proxy('http://queplanta.com', {
    proxyReqPathResolver: (req) => {
      console.log('req')
      console.log(req)
      return `/public${req.url}`
    }
  }))
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/*', serverRender);

export default server;
