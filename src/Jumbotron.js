import React from 'react';
import { 
  Typography, Container,
  List, ListItem, ListItemIcon, Grid, ListItemText,
  withStyles
} from '@material-ui/core';
import { Link } from './lib/Link.js';
import cameraFlatIcon from './assets/jumbotron/camera-flat.svg';
import locationFlatIcon from './assets/jumbotron/location-map-flat.svg';
import clipboardFlatIcon from './assets/jumbotron/clipboard-list-flat.svg';
import shuffleFlatIcon from './assets/jumbotron/shuffle-flat.svg';

function Jumbotron({classes, ...otherProps}) {
  return <Container className={classes.jumbotron} {...otherProps}>
    <Typography align="center" variant="h4">
      Rede social colaborativa que conecta pessoas e plantas.
    </Typography>

    <Grid container spacing={0} className={classes.listContainer}>
      <Grid item sm={6} component={(props) => <List component="div" {...props} />} disablePadding={true}>
        <ListItem component={Link} to="/identificacao" className={classes.link}>
          <ListItemIcon component="span"><img src={cameraFlatIcon} alt="" className={classes.jumbotronListIcon} /></ListItemIcon>
          <ListItemText component="span" primary="Identifique plantas por fotos de forma colaborativa." />
        </ListItem>
        <ListItem component={Link} to="/mapa" className={classes.link}>
          <ListItemIcon component="span"><img src={locationFlatIcon} alt="" className={classes.jumbotronListIcon} /></ListItemIcon>
          <ListItemText component="span" primary="Encontre arvores em sua cidade." />
        </ListItem>
      </Grid>
      <Grid item sm={6} component={(props) => <List component="div" {...props} />} disablePadding={true}>
        <ListItem component={Link} to="/como-funciona/catalogo-pessoal" className={classes.link}>
          <ListItemIcon component="span"><img src={clipboardFlatIcon} alt="" className={classes.jumbotronListIcon} /></ListItemIcon>
          <ListItemText component="span" primary="Catalogue sua coleção." />
        </ListItem>
        <ListItem component={Link} to="/feira" className={classes.link}>
          <ListItemIcon component="span"><img src={shuffleFlatIcon} alt="" className={classes.jumbotronListIcon} /></ListItemIcon>
          <ListItemText component="span" primary="Troque sementes com amigos." />
        </ListItem>
      </Grid>
    </Grid>
  </Container>
}

const styles = theme => ({
  jumbotron: {
    padding: theme.spacing(4, 3),
  },
  jumbotronListIcon: {
    width: 32,
  },
  listContainer: {
    maxWidth: 1045,
    margin: '20px auto 20px auto',
    [theme.breakpoints.up('md')]: {
      paddingLeft: 120,
    },
  },
  link: {
    color: 'white',
  }
});

export default withStyles(styles)(Jumbotron)