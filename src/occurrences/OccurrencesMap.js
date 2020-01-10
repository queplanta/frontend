import React, { useState, useRef } from 'react';
import { createRefetchContainer } from 'react-relay';
import { CardMedia, CardContent, Typography, Link, withStyles } from '@material-ui/core';
import { Link as RouterLink } from 'found';
import _ from 'lodash';
import ProfileLink from '../accounts/ProfileLink.js';
import { MapGeolocated, Marker, Popup, defaultBbox } from './Map.js';
import { refetchQuery, fragmentSpec } from './OccurrencesMap.query.js';
import PlantLink from '../plants/PlantLink.js';
import imgDefault from '../assets/plant-default.svg';

function OccurrencesMap(props) {
  const {classes, environment, plantId, viewer, relay, ...otherProps} = props;
  let [isLoading, setLoading] = useState(false);
  let [disposable, setDisposable] = useState(null);
  const ref = useRef();
  const {allOccurrences} = viewer;
  const {edges: items} = allOccurrences;

  function onBoundsChanged() {
    if (disposable) {
      disposable.dispose();
    }

    const bounds = ref.current.leafletElement.getBounds();
    const southWest = bounds.getSouthWest();
    const northEast = bounds.getNorthEast();
    const bbox = [southWest.lat, southWest.lng, northEast.lat, northEast.lng].join(',');
    setLoading(true);

    setDisposable(relay.refetch(
      fragmentVariables => ({
        ...fragmentVariables,
        bbox
      }),
      // {bbox},
      null,
      () => {
        setDisposable(null);
        setLoading(false);
      },
      {force: true, fetchPolicy: 'network-only'}
    ));
    // fetchQuery(environment, query, {
    //   count: 10000,
    //   identity: plantId ? plantId : null,
    //   bbox: bbox,
    // }).then(data => {
    //   console.log(data);
    //   setItems(data.allOccurrences.edges);
    //   setLoading(false);
    // }).catch(error => {
    //   console.error(error);
    //   setLoading(false);
    // });
  }

  console.log('allOccurrences', allOccurrences);
  console.log('items.length', items.length);

  return <MapGeolocated {...otherProps} mapRef={ref} isLoading={isLoading} onViewportChanged={onBoundsChanged}>
    {items.map(({node: occurrence}) => {
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
export default createRefetchContainer(
  withStyles(styles)(OccurrencesMap),
  fragmentSpec,
  refetchQuery
);
