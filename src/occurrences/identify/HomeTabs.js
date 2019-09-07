import React from 'react';
import { Paper, Tabs, Tab, withStyles } from '@material-ui/core';
import { Link as RouterLink } from 'found';
import { Width } from '../../ui';

function HomeTabs({children, classes, ...others}) {
  const value = window.location.pathname === '/identificacao/identificadas' ? 1 : 0;
  return <Width>
    <Paper className={classes.paper}>
      <Tabs value={value}>
        <Tab label="Últimos pedidos" component={RouterLink} to="/identificacao" />
        <Tab label="Identificadas" component={RouterLink} to="/identificacao/identificadas" />
      </Tabs>
    </Paper>
    {children}
  </Width>
}

const styles = (theme) => ({
  paper: {
    marginBottom: theme.spacing(2)
  }
})
export default withStyles(styles)(HomeTabs)
