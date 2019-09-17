import React from 'react';
import Helmet from 'react-helmet';
import { Button, Grid, withStyles } from '@material-ui/core';
import { Link as RouterLink } from 'found';
import PageTitle from '../lib/PageTitle.js';
import { Width } from '../ui';
import OccurrencesMap from './OccurrencesMap.js';

function Home(props) {
  const {classes, environment} = props;

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
    <OccurrencesMap className={classes.map} environment={environment} />
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