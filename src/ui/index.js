import React from 'react';
import { withStyles } from '@material-ui/core';
export { RelativeDate } from './RelativeDate.js';

export const Width = withStyles({
  root: {
    maxWidth: 1140,
    width: '100%',
    margin: '0 auto',
  }
})(({classes, ...others}) => <div className={classes.root} {...others} />)
