import React from 'react';
import { QueryRenderer } from 'react-relay';
import { withStyles } from '@material-ui/core';
import { MapGeolocated, Marker, Popup } from './Map.js';
import query from './OccurrencesMap.query.js';
import PlantLink from '../plants/PlantLink.js';

function OccurrencesMap(props) {
  const {classes, environment, plantId, ...otherProps} = props;

  return <MapGeolocated {...otherProps}>
    <QueryRenderer
      environment={environment}
      query={query}
      variables={{
        count: 500,
        identity: plantId ? plantId : null
      }}
      render={({error, props}) => {
        if (!props) {
          return null;
        }

        const {viewer: {allOccurrences: {edges: occurrences}}} = props;
        // if (error) {
        //   return <div><h1>Error!</h1><br />  {error}</div>;
        // }

        // if (props) {
        //   return <WhatIsThisListPaginated {...props} environment={environment} />
        // }

        // return <div className={classes.loading}><CircularProgress /></div>
        return <React.Fragment>
          {occurrences.map(({node: occurrence}) => {
            return <Marker key={occurrence.id} position={occurrence.location.coordinates}>
              <Popup><PlantLink plant={occurrence.identity} /></Popup>
            </Marker>
          })}
        </React.Fragment>
      }}
    />
  </MapGeolocated>
}

const styles = (theme) => ({});
export default withStyles(styles)(OccurrencesMap);
