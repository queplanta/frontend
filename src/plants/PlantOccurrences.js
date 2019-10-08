import React from 'react';
import Helmet from 'react-helmet';
import { withStyles } from '@material-ui/core';
import OccurrencesMap from '../occurrences/OccurrencesMap.js'; 

function PlantOccurrences(props) {
  const {classes, plant, environment} = props

  return <React.Fragment>
    <Helmet
      title={`Mapa de ${plant.title}`}
    />
    <OccurrencesMap
      className={classes.map}
      environment={environment}
      plantId={plant.id}
    />
  </React.Fragment>
}

const styles = (theme) => ({
  map: {
    height: 500,
  },
})

export default withStyles(styles)(PlantOccurrences)
