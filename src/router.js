import queryMiddleware from 'farce/lib/queryMiddleware';
import createRender from 'found/lib/createRender';
import makeRouteConfig from 'found/lib/makeRouteConfig';
import React from 'react';

import {appRoute} from './App.js';

export const historyMiddlewares = [queryMiddleware];

export const routeConfig = makeRouteConfig(appRoute);

export const render = createRender({});
