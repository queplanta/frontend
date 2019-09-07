import React from 'react';
import { withStyles } from '@material-ui/core';
import { createPaginationContainer } from 'react-relay';
import ButtonWithProgress from '../lib/ButtonWithProgress.js';
import PlantItem from './PlantItem.js';
import { fragmentQuery, query } from './PlantList.query.js';

function PlantList(props) {
  const {classes, relay, viewer: {allLifeNode: {edges: plants}}} = props
  const [isLoading, setLoading] = React.useState(false)
  const hasMore = relay.hasMore()

  function handleLoadMore() {
    if (!hasMore || relay.isLoading()) {
      return;
    }

    setLoading(true)
    relay.loadMore(props.count, (error) => {
      if (error) console.error(error);
      setLoading(false)
    })
  }  

  return <React.Fragment>
    {plants.map(({node: plant}) => {
      return <PlantItem key={plant.id} lifeNode={plant} />
    })}
    <div className={classes.wrapBtn}>
      <ButtonWithProgress disabled={!hasMore} fullWidth={true} variant="outlined" isLoading={isLoading} onClick={handleLoadMore}>{(!hasMore) ? 'Fim das plantas' : 'Carregar mais plantas'}</ButtonWithProgress>
    </div>
  </React.Fragment>
}

const styles = (theme) => ({
  wrapBtn: {
    padding: theme.spacing(2, 0),
  }
})

export default createPaginationContainer(
  withStyles(styles)(PlantList) ,
  fragmentQuery,
  {
    direction: 'forward',
    query: query,
    getConnectionFromProps(props) {
      return props.viewer.allLifeNode;
    },
    getVariables(props, paginationInfo, fragmentVariables) {
      return {
        ...paginationInfo,
      }
    }
  },
)