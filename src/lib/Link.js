import React from 'react';
import { Link as MuiLink } from '@material-ui/core';
import { Link as RouterLink } from 'found';

export const Link = React.forwardRef(function(props, ref) {
  return <MuiLink component={RouterLink} ref={ref} {...props} />
})

export default Link