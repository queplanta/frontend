import React from 'react';
import Helmet from 'react-helmet';
import { Paper, withStyles } from '@material-ui/core';
import PageTitle from '../lib/PageTitle.js';
import { Width } from '../ui';
import PlantList from './PlantList.js';
import { TabsRoute, TabRoute } from '../lib/Tabs.js';

function PlantsHome(props) {
  const {classes, viewer} = props;

  return <Width>
    <Helmet title="Plantas" />
    <Paper className={classes.paper}>
      <TabsRoute
        indicatorColor="primary"
        textColor="primary"
      >
        <TabRoute label="Todas" wrapped value="/plantas" />
        <TabRoute label="Comestíveis" wrapped value="/plantas/comestiveis" />
      </TabsRoute>
    </Paper>
    <PageTitle>Plantas</PageTitle>
    <PlantList viewer={viewer} count={30} />
  </Width>
}

const styles = (theme) => ({
  paper: {
    marginBottom: theme.spacing(2)
  }
})
export default withStyles(styles)(PlantsHome)