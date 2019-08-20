import React from 'react';
import PropTypes from 'prop-types'
import {
  Button, CircularProgress, withStyles
} from '@material-ui/core';

function ButtonWithProgress({isLoading, children, classes, ...others}) {
  return <Button disabled={isLoading} {...others}>
    {children}
    {isLoading && <CircularProgress size={24} className={classes.buttonProgress} />}
  </Button>
}

ButtonWithProgress.propTypes = {
  isLoading: PropTypes.bool.isRequired,
}

export default withStyles({
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  }
})(ButtonWithProgress)
