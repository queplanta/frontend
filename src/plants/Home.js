import React from 'react';
import Helmet from 'react-helmet';
import { withStyles } from '@material-ui/core';
import PageTitle from '../lib/PageTitle.js';
import { Width } from '../ui';
import PlantList from './PlantList.js';

function PlantsHome(props) {
  const {viewer} = props;

  return <Width>
    <Helmet title="Plantas" />
    <PageTitle>Plantas</PageTitle>
    <PlantList viewer={viewer} count={30} />
  </Width>
}

const styles = {}

export default withStyles(styles)(PlantsHome)