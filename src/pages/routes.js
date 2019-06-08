import React from 'react';
import Route from 'found/lib/Route';
import Page from './Page.js';
import PageQuery from './Page.query.js';

export const pagesRoutes = <React.Fragment>
  <Route
    path="/:url"
    query={PageQuery}
    Component={Page}
  />
</React.Fragment>