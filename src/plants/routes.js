import React from 'react';
import Route from '../relay/RouteWithLoading';
import Plant from './Plant.js';
import PlantQuery from './Plant.query.js';
import PlantDescription from './PlantDescription.js';
import PlantDescriptionQuery from './PlantDescription.query.js';
import PlantOccurrences from './PlantOccurrences.js';
import PlantOccurrencesQuery from './PlantOccurrences.query.js';

export const plantsRoutes = <React.Fragment>
  <Route
    path="/:plantSlug-p:plantID(\d+)"
    query={PlantQuery}
    Component={Plant}
  >
  	<Route Component={PlantDescription} query={PlantDescriptionQuery} />
  	<Route path="ocorrencias" query={PlantOccurrencesQuery} render={(args) => {
      return <PlantOccurrences {...args.props} environment={args.environment} />
    }} />
  </Route>
</React.Fragment>
