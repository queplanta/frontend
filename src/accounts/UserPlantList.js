import React from 'react';
import Helmet from 'react-helmet';
import { Grid, withStyles } from '@material-ui/core';
import { createPaginationContainer } from 'react-relay';
import PlantItem from '../plants/PlantItem.js';
import { fragmentSpec, query } from './UserPlantList.query.js';

function UserPlantList(props) {
  const { user } = props;
  console.log(user)

  if (!user.wishList || !user.wishList.edges) {
    return null;
  }


  const title = 'Quero ter'

  return <React.Fragment>
    <Helmet title={title} />
    <Grid container spacing={3}>
      {user.wishList.edges.map(edge => {
        const {plant} = edge.node;
        return <Grid item xs={12} md={4} key={edge.node.id}>
          <PlantItem lifeNode={plant} />
        </Grid>
      })}
    </Grid>
  </React.Fragment>
}

const styles = {}

export default createPaginationContainer(
  withStyles(styles)(UserPlantList) ,
  fragmentSpec,
  {
    direction: 'forward',
    query: query,
    getConnectionFromProps(props) {
      return props.user.wishList;
    },
    getVariables(props, paginationInfo, fragmentVariables) {
      return {
        ...paginationInfo,
        username: fragmentVariables.username
      }
    }
  },
)
