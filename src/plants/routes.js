import React from 'react';
import Route from '../relay/RouteWithLoading';
import Plant from './Plant.js';
import PlantQuery from './Plant.query.js';
import PlantDescription from './PlantDescription.js';
import PlantDescriptionQuery from './PlantDescription.query.js';
import PlantOccurrences from './PlantOccurrences.js';
import PlantOccurrencesQuery from './PlantOccurrences.query.js';
import PlantPhotos from './PlantPhotos.js';
import PlantPhotosQuery from './PlantPhotos.query.js';
import PlantEdit from './PlantEdit.js';
import PlantEditQuery from './PlantEdit.query.js';
import HomePlants from './Home.js';
import HomePlantsQuery from './Home.query.js';
import PlantWishList from './PlantWishList.js';
import PlantWishListQuery from './PlantWishList.query.js';
import PlantCollectionList from './PlantCollectionList.js';
import PlantCollectionListQuery from './PlantCollectionList.query.js';

export const plantsRoutes = <React.Fragment>
  <Route
    path="/plantas"
    query={HomePlantsQuery}
    render={(args) => {
      const {props, ...otherProps} = args
      return <HomePlants {...props} relay={otherProps} />
    }}
    prepareVariables={(params, {location}) => {
      return {...params, search: location.query.q}
    }}
  />
  <Route
    path="/plantas/comestiveis"
    query={HomePlantsQuery}
    prepareVariables={(params) => ({
      ...params,
      edibles: true
    })}
    render={(args) => {
      const {props, ...otherProps} = args
      return <HomePlants {...props} relay={otherProps} />
    }}
  />
  <Route
    path="/:plantSlug-p:plantID(\d+)"
    query={PlantQuery}
    Component={Plant}
  >
    <Route Component={PlantDescription} query={PlantDescriptionQuery} />
    <Route path="mapa" Component={PlantOccurrences}  query={PlantOccurrencesQuery} />
    <Route path="fotos" Component={PlantPhotos} query={PlantPhotosQuery} />
    <Route path="quem-quer-ter" Component={PlantWishList} query={PlantWishListQuery} />
    <Route path="quem-tem" Component={PlantCollectionList} query={PlantCollectionListQuery} />
  </Route>
  <Route path="/:plantSlug-p:plantID(\d+)/editar" Component={PlantEdit} query={PlantEditQuery} />
</React.Fragment>
