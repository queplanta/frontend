import React from 'react';
import { 
  Typography, Container,
  List, ListItem, ListItemIcon, Grid, ListItemText,
  Hidden, withStyles
} from '@material-ui/core';
import { withRouter } from 'found';
import { Link } from './lib/Link.js';
import cameraFlatIcon from './assets/jumbotron/camera-flat.svg';
import locationFlatIcon from './assets/jumbotron/location-map-flat.svg';
import clipboardFlatIcon from './assets/jumbotron/clipboard-list-flat.svg';
import shuffleFlatIcon from './assets/jumbotron/shuffle-flat.svg';

function Jumbotron({classes}) {
  return <Container className={classes.jumbotron}>
    <Typography align="center" variant="h4">
      Rede social colaborativa que conecta pessoas e plantas.
    </Typography>

    <Grid container spacing={0} className={classes.listContainer}>
      <Grid item sm={6} component={(props) => <List component="div" {...props} />} disablePadding={true}>
        <ListItem component={Link} to="/identificacao" className={classes.link}>
          <ListItemIcon component="span"><img src={cameraFlatIcon} className={classes.jumbotronListIcon} /></ListItemIcon>
          <ListItemText component="span" primary="Identifique plantas por fotos de forma colaborativa." />
        </ListItem>
        <ListItem component={Link} to="/ocorrencias" className={classes.link}>
          <ListItemIcon component="span"><img src={locationFlatIcon} className={classes.jumbotronListIcon} /></ListItemIcon>
          <ListItemText component="span" primary="Encontre arvores em sua cidade." />
        </ListItem>
      </Grid>
      <Grid item sm={6} component={(props) => <List component="div" {...props} />} disablePadding={true}>
        <ListItem component={Link} to="/como-funciona/catalogo-pessoal" className={classes.link}>
          <ListItemIcon component="span"><img src={clipboardFlatIcon} className={classes.jumbotronListIcon} /></ListItemIcon>
          <ListItemText component="span" primary="Catalogue sua coleção." />
        </ListItem>
        <ListItem component={Link} to="/feira" className={classes.link}>
          <ListItemIcon component="span"><img src={shuffleFlatIcon} className={classes.jumbotronListIcon} /></ListItemIcon>
          <ListItemText component="span" primary="Troque sementes com amigos." />
        </ListItem>
      </Grid>
    </Grid>
    {/*<div style={{textAlign: 'center'}}>
      <Button variant="contained" color="primary">Conheça mais</Button>{` e `}<Button variant="contained">Como funciona</Button>
    </div>*/}
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

export default withStyles(styles)(withRouter(Jumbotron))
