import React from 'react';
import Route from '../relay/RouteWithLoading';
import Page from './Page.js';
import PageQuery from './Page.query.js';
import PageCreate from './PageCreate.js';
import PageCreateQuery from './PageCreate.query.js';
import PageEdit from './PageEdit.js';
import PageEditQuery from './PageEdit.query.js';

export const pagesRoutes = <React.Fragment>
  <Route
    path="/paginas/nova"
    query={PageCreateQuery}
    render={(props) => <PageCreate {...props} />}
  />
  <Route path="/paginas/:id/editar" query={PageEditQuery} render={(args) => {
    return <PageEdit {...args.props} environment={args.environment} />
  }} />
  <Route
    path="/:url(.+)"
    query={PageQuery}
    Component={Page}
  />
</React.Fragment>
