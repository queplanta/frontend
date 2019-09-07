import React from 'react';
import { Card, CardContent, CardMedia, Typography, Link, withStyles } from '@material-ui/core';
import { createFragmentContainer } from 'react-relay';
import { Link as RouterLink } from 'found';
import _ from 'lodash';
import query from './PlantItem.query.js';
import imgDefault from '../assets/plant-default.svg';

function PlantItem(props) {
  const {classes, lifeNode: plant} = props;
  const mainImage = _.get(plant, 'images.edges[0].node.bigImage.url', imgDefault);
  return <Card className={classes.card}>
        <CardMedia
          to={`/${plant.slug}-p${plant.idInt}`}
          component={RouterLink} 
          className={classes.cover}
          image={mainImage}
          alt={plant.title}
        />
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Link to={`/${plant.slug}-p${plant.idInt}`} component={RouterLink}>
              <Typography component="h6" variant="h6">
                {plant.title}
              </Typography>
            </Link>
            <Typography variant="subtitle1" color="textSecondary">
              {plant.rankDisplay}
            </Typography>
          </CardContent>
        </div>
    </Card>
}

const styles = (theme) => ({
  card: {
    display: 'flex',
    marginBottom: theme.spacing(2),
  },
  cardAction: {
    display: 'block',
    textAlign: 'initial'
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
  },
})

export default createFragmentContainer(
  withStyles(styles)(PlantItem),
  query
)