import React from 'react';
import { Typography, withStyles } from '@material-ui/core';

function PageTitle(props) {
  return <Typography component="h1" variant="h4" {...props} />;
}

const styles = {
  root: {
    marginBottom: '20px',
  },
};
export default withStyles(styles)(PageTitle);
