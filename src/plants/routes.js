import React from 'react';
import Route from '../relay/RouteWithLoading';
import Plant from './Plant.js';
import PlantQuery from './Plant.query.js';

export const plantsRoutes = <React.Fragment>
  <Route
    path="/:plantSlug-p:plantID(\d+)"
    query={PlantQuery}
    Component={Plant}
  />
</React.Fragment>
