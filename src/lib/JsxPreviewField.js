import React from 'react'
import { TextField, Grid } from '@material-ui/core';
import JsxParser from './JsxParser.js';

export default (props) => {
  const {environment, value, ...otherProps} = props;
  return <Grid container spacing={2}>
    <Grid item sm={6}>
        <TextField
          value={value}
          {...otherProps}
        />
    </Grid>
    <Grid item sm={6}>
      <JsxParser
        jsx={value}
        environment={environment}
      />
    </Grid>
  </Grid>
}
