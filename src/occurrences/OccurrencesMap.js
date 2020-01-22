import React from 'react';
import { QueryRenderer } from 'react-relay';
import { CardMedia, CardContent, Typography, LinearProgress, Link, withStyles } from '@material-ui/core';
import { Link as RouterLink } from 'found';
import _ from 'lodash';
import ProfileLink from '../accounts/ProfileLink.js';
import { MapGeolocated, Marker, Popup } from './Map.js';
import query from './OccurrencesMap.query.js';
import PlantLink from '../plants/PlantLink.js';
// import { RelativeDate } from '../ui';
import imgDefault from '../assets/plant-default.svg';

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
          return <LinearProgress style={{zIndex: 400}} />;
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
            const mainImage = _.get(occurrence.identity, 'images.edges[0].node.smallImage.url', imgDefault);
            return <Marker key={occurrence.id} position={occurrence.location.coordinates}>
              <Popup className={classes.popup}>
                <div className={classes.card}>
                  <CardMedia
                    className={classes.cover}
                    image={mainImage}
                    component={RouterLink}
                    to={`/observacoes/${occurrence.id}`}
                  />
                  <div className={classes.details}>
                    <CardContent className={classes.content}>
                      <PlantLink plant={occurrence.identity}>
                        {occurrence.identity.commonName ?
                          <React.Fragment>
                            <Typography variant="body1" component="span" className={classes.commonName}>{occurrence.identity.commonName.name}</Typography><br />
                            <Typography variant="body2" component="span">{occurrence.identity.title}</Typography>
                          </React.Fragment>
                        :
                          <Typography variant="body1" component="span">{occurrence.identity.title}</Typography>
                        }
                      </PlantLink>
                      <br /><br />
                      <Link href={`http://maps.google.com/?cbll=${occurrence.location.coordinates[0]},${occurrence.location.coordinates[1]}&cbp=12,90,0,0,5&layer=c`} target="_blank" rel="noopener noreferrer">Abrir no Google Street View</Link>
                      <br/><br/>Adicionada por: <ProfileLink user={occurrence.author} />
                      {/*<br />
                      <RelativeDate prefix="Publicado" date={occurrence.revisionCreated.createdAt} />*/}
                    </CardContent>
                  </div>
                </div>
              </Popup>
            </Marker>
          })}
        </React.Fragment>
      }}
    />
  </MapGeolocated>
}

const styles = (theme) => ({
  popup: {
    width: 300,
  },
  card: {
    display: 'flex',
    marginBottom: theme.spacing(2),
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  commonName: {
    textTransform: 'capitalize',
  },
  cover: {
    width: 100,
  },
});
export default withStyles(styles)(OccurrencesMap);
