import React from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Typography, Link, withStyles } from '@material-ui/core';
import { createFragmentContainer } from 'react-relay';
import { Link as RouterLink } from 'found';
import _ from 'lodash';
import fragmentSpec from './PlantItem.query.js';
import imgDefault from '../assets/plant-default.svg';

function PlantItem(props) {
  const {classes, lifeNode: plant} = props;
  const mainImage = _.get(plant, 'images.edges[0].node.bigImage.url', imgDefault);
  const commonName = _.get(plant, 'commonName.name');
  return <Card>
    <CardActionArea>
      <CardMedia
        to={`/${plant.slug}-p${plant.idInt}`}
        component={RouterLink} 
        className={classes.cover}
        image={mainImage}
        alt={plant.title}
      />
      <CardContent>
        <Link to={`/${plant.slug}-p${plant.idInt}`} component={RouterLink}>
          <Typography component="h6" variant="h6">
            {commonName ?
              <React.Fragment>{commonName} <small className={classes.binomialTitle}>{plant.title}</small></React.Fragment>
            : plant.title}
          </Typography>
        </Link>
        <Typography variant="subtitle1" color="textSecondary">
          {plant.rankDisplay}
        </Typography>
      </CardContent>
    </CardActionArea>
  </Card>
}

const styles = (theme) => ({
  cover: {
    height: 160,
  },
  binomialTitle: {
    color: '#797979',
    display: 'block',
  },
})

export default createFragmentContainer(
  withStyles(styles)(PlantItem),
  fragmentSpec
)
