import React, { useRef } from 'react';
import { QueryRenderer } from 'react-relay';
import Helmet from 'react-helmet';
import { Button, Grid, withStyles } from '@material-ui/core';
import { MapGeolocated, Marker, Popup } from './Map.js';
import { Link as RouterLink } from 'found';
import PageTitle from '../lib/PageTitle.js';
import { Width } from '../ui';
import query from './Map.query.js';
import PlantLink from '../plants/PlantLink.js';

function Home(props) {
  const {classes, environment} = props;
  const mapRef = useRef(null);

  // const [bounds, setBounds] = useState(null);
  // onViewportChanged={onViewportChanged}
  // function onViewportChanged(viewport) {
  //   const map = mapRef.current.leafletElement;
  //   setBounds(map.getBounds());
  // }
  // console.log('bounds', bounds);

  return <Width>
    <Helmet title="Ocorrências" />
    <Grid container>
      <Grid item xs={12} sm={6}>
        <PageTitle>Ocorrências</PageTitle>
      </Grid>
      <Grid item xs={12} sm={6} className={classes.buttonWraper}>
        <Button variant="contained" color="primary" component={RouterLink} to={`/ocorrencias/adicionar`}>Adicionar no mapa</Button>
      </Grid>
    </Grid>
    <MapGeolocated ref={mapRef} className={classes.map}>
      <QueryRenderer
        environment={environment}
        query={query}
        variables={{
          count: 500,
          // bounds: bounds,
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
  </Width>
}

const styles = (theme) => ({
  map: {
    height: 500,
  },
  buttonWraper: {
    [theme.breakpoints.up('sm')]: {
      textAlign: 'right',
    },
  },
});
export default withStyles(styles)(Home);
