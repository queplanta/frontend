import React from "react";
import { Route, createRender, makeRouteConfig } from "found";
import { queryMiddleware } from "farce";

import App from "./App.js";
import AppQuery from "./App.query.js";
import RouteWithLoading from "./relay/RouteWithLoading.js";
import { homeRoute } from "./Home";
import { accountsRoutes } from "./accounts/routes.js";
import { blogRoutes } from "./blog/routes.js";
import { pagesRoutes } from "./pages/routes.js";
import { plantsRoutes } from "./plants/routes.js";
import { membersRoutes } from "./members/routes.js";
import { occurrencesRoutes } from "./occurrences/routes.js";
import { revisionsRoutes } from "./revisions/routes.js";

import OccurrencePlate from "./occurrences/OccurrencePlate.js";
import OccurrencePlateQuery from "./occurrences/OccurrencePlate.query.js";

export const historyMiddlewares = [queryMiddleware];

export const routeConfig = makeRouteConfig(
  <React.Fragment>
    {/* this is here because it needs to be outside of App html structure */}
    <RouteWithLoading
      path="/observacoes/:id/placa"
      query={OccurrencePlateQuery}
      Component={OccurrencePlate}
      prepareVariables={(params) => {
        return {
          ...params,
          url: `https://queplanta.com/observacoes/${params.id}`,
        };
      }}
    />

    <Route path="/" Component={App} query={AppQuery}>
      {homeRoute}
      {plantsRoutes}
      {blogRoutes}
      {occurrencesRoutes}
      {accountsRoutes}
      {membersRoutes}
      {revisionsRoutes}

      {/*needs to be last one*/}
      {pagesRoutes}
    </Route>
  </React.Fragment>
);

export const render = createRender({});
