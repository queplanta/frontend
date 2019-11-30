import React from 'react';
import Helmet from 'react-helmet';
import { Card, CardContent, CardActionArea, TextField,
  IconButton, Checkbox, List, ListItem, ListItemText,
  ListItemSecondaryAction, Grid, Typography, withStyles } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import PageTitle from '../lib/PageTitle.js';
import ProfileLink from '../accounts/ProfileLink';
import { Width } from '../ui';


function Home(props) {
  const {classes} = props;

  const product_item = (
    <Grid item xs={6} md={4}>
      <Card className={classes.card}>
        <CardActionArea>
          <div className={classes.wrapImg}>
            <img
              alt="Contemplative Reptile"
              height="295"
              src="/public/cache/a7/70/a7709de42ed444df8eca574e37cb95e8.jpg"
              title="Contemplative Reptile"
            />
          </div>
          <CardContent>
            <Typography gutterBottom variant="body2" component="h4">
              Mudas de Mangueira
            </Typography>
          </CardContent>
        </CardActionArea>
        <div className={classes.cardPriceContent}>
          <Typography variant="body2" className={classes.cardPrice}>
            R$27,90
          </Typography>
          <Typography variant="caption">
            <a href="#">Gabriel Leandro Loja</a>
          </Typography>
        </div>
      </Card>
    </Grid>
  )

  return <Width>
    <Helmet title="MarketPlace" />
    <PageTitle>MarketPlace</PageTitle>
    <Grid container spacing={3}>
      <Grid item xs={12} md={3}>
        <div>
          <TextField
            className={classes.input}
            placeholder="Buscar"
            inputProps={{ 'aria-label': 'buscar' }}
          />
          <IconButton type="submit" className={classes.iconButton} aria-label="search">
            <SearchIcon />
          </IconButton>
          <Typography gutterBottom variant="subtitle2" component="p">
            Categorias
          </Typography>
          <List dense className={classes.root}>
            {[0, 1, 2, 3].map(value => {
              const labelId = `checkbox-list-secondary-label-${value}`;
              return (
                <ListItem key={value} button>
                  <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
                  <ListItemSecondaryAction>
                    <Checkbox
                      edge="end"
                      inputProps={{ 'aria-labelledby': labelId }}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })}
          </List>
        </div>
        <div>
          <Typography gutterBottom variant="subtitle2" component="p">
            Preços
          </Typography>
        </div>
      </Grid>
      <Grid item xs={12} md={9}>
        <Grid container spacing={3}>
          {product_item}
          {product_item}
          {product_item}
          {product_item}
          {product_item}
          {product_item}
          {product_item}
          {product_item}
        </Grid>
      </Grid>
    </Grid>
  </Width>
}

const styles = (theme) => ({
  wrapImg: {
    padding: theme.spacing(2,2,0,2),
    textAlign: 'center',
  },
  cardPriceContent: {
    borderTop: 'solid 1px #d2d2d2',
    padding: theme.spacing(1,2),
  },
  cardPrice: {
    fontSize: '18px',
    fontWeight: 'bold',
  },
})

export default withStyles(styles)(Home)
