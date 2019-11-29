import React from 'react';
import { useMediaQuery, withStyles } from '@material-ui/core';
import OccurrencesMap from './occurrences/OccurrencesMap.js'; 
import { useTheme } from '@material-ui/core/styles';

function HomeMap(props) {
  const {classes, environment} = props
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  var map = '';
  if(isMobile) {
    map = <OccurrencesMap
      className={classes.map}
      environment={environment}
      scrollWheelZoom={false}
      dragging={false}
      tap={false}
    />
  } else {
    map = <OccurrencesMap
      className={classes.map}
      environment={environment}
      scrollWheelZoom={false}
      dragging={true}
      tap={true}
    />
  }

  return <React.Fragment>
    {map}
  </React.Fragment>
}

const styles = (theme) => ({
  map: {
    height: 310,
  },
})

export default withStyles(styles)(HomeMap)
