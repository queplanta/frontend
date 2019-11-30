import React from 'react';
import Helmet from 'react-helmet';
import { Button, Paper, Grid, Hidden, Typography, withStyles } from '@material-ui/core';
import ProfileLink from '../accounts/ProfileLink';
import { Width } from '../ui';


function Home(props) {
  const {classes} = props;

  return <Width>
    <Helmet title="MarketPlace" />
    <Paper className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3} className={classes.wrapImg}>
         <img
            alt="Contemplative Reptile"
            height="295"
            src="/public/cache/a7/70/a7709de42ed444df8eca574e37cb95e8.jpg"
            title="Contemplative Reptile"
          />
        </Grid>
        <Grid item xs={12} md={9}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" component="h1">
                Mudas de Mangifera indica
              </Typography>
              <Hidden smDown>
                <Typography variant="body2" component="p" color="textSecondary">
                  Mangifera indica é uma espécie de planta da família Anacardiaceae, que produz o fruto conhecido como manga. Pode ser encontrada na forma nativa nas florestas do sul e sudeste da Ásia, tendo sido introduzida em várias regiões do Mundo. A espécie foi levada para Ásia em torno de 400-500 aC a partir da Índia; seguindo, no século 15 para as Filipinas, sendo levada à África e ao Brasil pelos colonizadores portugueses no século XVI 
                </Typography>
              </Hidden>
            </Grid>
            <Grid item xs={6} md={12} className={classes.productPrice}>
              R$278,90
            </Grid>
            <Grid item xs={6} md={12}>
              <Button variant="contained" color="primary">
                Comprar
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="caption">
                <a href="#">Gabriel Leandro Loja</a>
              </Typography>
              <Hidden smUp>
                <Typography variant="subtitle2" className={classes.subTitle}>
                  Detalhes do produto
                </Typography>
                <Typography variant="body2" component="p" color="textSecondary">
                  Mangifera indica é uma espécie de planta da família Anacardiaceae, que produz o fruto conhecido como manga. Pode ser encontrada na forma nativa nas florestas do sul e sudeste da Ásia, tendo sido introduzida em várias regiões do Mundo. A espécie foi levada para Ásia em torno de 400-500 aC a partir da Índia; seguindo, no século 15 para as Filipinas, sendo levada à África e ao Brasil pelos colonizadores portugueses no século XVI 
                </Typography>
              </Hidden>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  </Width>
}

const styles = (theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  wrapImg: {
    textAlign: 'center',
  },
  productPrice: {
    fontSize: '18px',
    fontWeight: 'bold',
  },
  subTitle: {
    margin: theme.spacing(2,0),
    paddingTop: theme.spacing(2),
    borderTop: 'solid 1px #ccc'
  }
})

export default withStyles(styles)(Home)
