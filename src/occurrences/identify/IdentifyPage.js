import React from 'react';
import { Paper, withStyles } from '@material-ui/core';
import { Width } from '../../ui';
import PageTitle from '../../lib/PageTitle.js';
import AddIdentify from './AddIdentify.js';

const IdentifyPage = ({classes, environment, viewer}) => {
  return <Width component="div">
    <PageTitle>Adicionar pedido de identificação</PageTitle>
      <Paper className={classes.paper}>
        <AddIdentify environment={environment} />
      </Paper>
  </Width>
}

const styles = (theme) => ({
  paper: {
    padding: theme.spacing(2),
  },
})
export default withStyles(styles)(IdentifyPage)
