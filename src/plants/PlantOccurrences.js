import React from 'react';
// import Helmet from 'react-helmet';
import { withStyles } from '@material-ui/core';
// import _ from 'lodash';
import OccurrencesMap from '../occurrences/OccurrencesMap.js'; 

function PlantOccurrences(props) {
  const {classes, plant, environment} = props

  return <OccurrencesMap
    className={classes.map}
    environment={environment}
    plantId={plant.id}
  />
}

const styles = (theme) => ({
  map: {
    height: 500,
  },
})

export default withStyles(styles)(PlantOccurrences)
