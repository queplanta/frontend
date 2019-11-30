import React from 'react';
import Route from '../relay/RouteWithLoading';
import Home from './Home.js';
import Product from './Product.js';


export const marketPlaceRoutes = <React.Fragment>
  <Route
    path="/marketplace"
    Component={Home}
    prepareVariables={(params) => ({...params, count: 30})}
  />
  <Route
    path="/marketplace/produto"
    Component={Product}
  />
</React.Fragment>