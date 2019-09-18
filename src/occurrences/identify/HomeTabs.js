import React from 'react';
import { Paper, withStyles } from '@material-ui/core';
import { Width } from '../../ui';
import { TabsRoute, TabRoute } from '../../lib/Tabs.js';

function HomeTabs({children, classes, ...others}) {
  return <Width>
    <Paper className={classes.paper}>
      <TabsRoute
        indicatorColor="primary"
        textColor="primary"
      >
        <TabRoute label="Últimos pedidos" wrapped value="/identificacao" />
        <TabRoute label="Identificadas" wrapped value="/identificacao/identificadas" />
      </TabsRoute>
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
