import React from 'react';
import Route from '../relay/RouteWithLoading';
import UsageCreate from './UsageCreate.js';
import UsageCreateQuery from './UsageCreate.query.js';

export const usagesRoutes = <React.Fragment>
  <Route
    path="/usos/adicionar"
    Component={UsageCreate}
    query={UsageCreateQuery}
  />
</React.Fragment>
