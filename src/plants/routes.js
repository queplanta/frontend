import React from 'react';
import Route from 'found/lib/Route';
import Plant from './Plant.js';
import PlantQuery from './Plant.query.js';

export const plantsRoutes = <React.Fragment>
  <Route
    path="/:plantSlug-p:plantID"
    query={PlantQuery}
    Component={Plant}
  />
</React.Fragment>