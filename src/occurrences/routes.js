import React from 'react';
import { Route } from 'found';
import IdentifyPage from './identify/IdentifyPage.js';
import IdentifyPageQuery from './identify/IdentifyPage.query.js';

export const occurrencesRoutes = <React.Fragment>
  <Route
    path="/identificacao/pedido"
    query={IdentifyPageQuery}
    render={(args) => {
      return <IdentifyPage {...args.props} environment={args.environment} />
    }}
  />
</React.Fragment>
