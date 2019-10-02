import React from 'react';
import Route from 'found/lib/Route';
import queryMiddleware from 'farce/lib/queryMiddleware';
import createRender from 'found/lib/createRender';
import makeRouteConfig from 'found/lib/makeRouteConfig';

import App from './App.js';
import AppQuery from './App.query.js';
import RouteWithLoading from './relay/RouteWithLoading.js';
import {homeRoute} from './Home.js';
import {accountsRoutes} from './accounts/routes.js';
import {blogRoutes} from './blog/routes.js';
import {pagesRoutes} from './pages/routes.js';
import {plantsRoutes} from './plants/routes.js';
import {occurrencesRoutes} from './occurrences/routes.js';
import {revisionsRoutes} from './revisions/routes.js';
<<<<<<< HEAD

import OccurrenceQuery from './occurrences/Occurrence.query.js';
import OccurrencePlate from './occurrences/OccurrencePlate.js';

export const historyMiddlewares = [queryMiddleware];

export const routeConfig = makeRouteConfig(<React.Fragment>
  <RouteWithLoading
    path="/observacoes/:id/placa"
    query={OccurrenceQuery}
    Component={OccurrencePlate}
  />
  <Route
    path="/"
    Component={App}
    query={AppQuery}
  >
    {homeRoute}
    {plantsRoutes}
    {blogRoutes}
    {occurrencesRoutes}
    {accountsRoutes}
    {revisionsRoutes}

    {/*needs to be last one*/}
    {pagesRoutes}
  </Route>
</React.Fragment>);
=======

export const historyMiddlewares = [queryMiddleware];

export const routeConfig = makeRouteConfig(<Route
  path="/"
  Component={App}
  query={AppQuery}
>
  {homeRoute}
  {plantsRoutes}
  {blogRoutes}
  {occurrencesRoutes}
  {pagesRoutes}
  {accountsRoutes}
  {revisionsRoutes}
</Route>);
>>>>>>> fc7cb50... Revisions pages

export const render = createRender({});
