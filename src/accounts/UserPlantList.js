import React from 'react';
import Helmet from 'react-helmet';
import { Grid, Button, Card, CardActionArea, CardMedia,
  CardContent, CardActions, Typography, withStyles } from '@material-ui/core';

function UserPlantList(props) {
  const { classes } = props;
  const title = 'Quero ter'
  const forloop = (
    <Grid item xs={12} md={4}>
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image="http://localhost:3000/public/cache/0f/d8/0fd8ee8296191ee0956d0c096ec5729a.jpg"
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h6" component="h2">
              Anthoceros fusiformis
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Espécie
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Share
          </Button>
          <Button size="small" color="primary">
            Comprar
          </Button>
        </CardActions>
      </Card>
    </Grid> 
  )

  return <React.Fragment>
    <Helmet title={title} />
    <Grid container spacing={3}>
      {forloop}
      {forloop}
      {forloop}
      {forloop}
      {forloop}
      {forloop}
      {forloop}
      {forloop}
      {forloop}
      {forloop}
    </Grid>
  </React.Fragment>
}

const styles = (theme) => ({
  paper: {
    marginBottom: theme.spacing(3),
  },
  tabsRoute: {
    marginBottom: theme.spacing(3),
  },
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
})

export default withStyles(styles)(UserPlantList)
