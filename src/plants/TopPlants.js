import React from 'react';
import { Typography, Paper, withStyles } from '@material-ui/core';

const TopPlants = ({classes}) => {
  return <Paper className={classes.root}>
    <Typography component="h5" variant="h4" className={classes.title}>Espécies mais populares do mês.</Typography>
  </Paper>
}

const styles = (theme) => ({
  root: {
  },
  title: {
    padding: theme.spacing(2),
  },
  actionRoot: {
    right: theme.spacing(2),
  },
})

export default withStyles(styles)(TopPlants)
