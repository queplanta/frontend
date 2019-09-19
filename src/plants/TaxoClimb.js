import React, { useState } from 'react';
import { Typography } from '@material-ui/core';
import { createPaginationContainer } from 'react-relay';
import ButtonWithProgress from '../lib/ButtonWithProgress.js';
import PlantLink from '../plants/PlantLink.js';
import { fragmentSpec, query } from './TaxoClimb.query.js'

function TaxoClimbing({lifeNode, relay}) {
  if (lifeNode.children.edges.length === 0) {
    return null;
  }
  const [isLoading, setLoading] = useState(false)
  const hasMore = relay.hasMore()

  function handleLoadMore() {
    if (!hasMore || relay.isLoading()) {
      return;
    }

    setLoading(true)
    relay.loadMore(30, (error) => {
      if (error) console.error(error);
      setLoading(false)
    })
  }

  return <div>
    <Typography variant="h6">Subindo a arvore:</Typography>
    <ul>
      {lifeNode.children.edges.map(({node}) => <li key={node.id}>
        <PlantLink plant={node} />
      </li>)}
      <li><ButtonWithProgress variant="outlined" isLoading={isLoading} onClick={handleLoadMore}>...mais</ButtonWithProgress></li>
    </ul>
  </div>
}

export default createPaginationContainer(
  TaxoClimbing,
  fragmentSpec,
  {
    direction: 'forward',
    query: query,
    getConnectionFromProps(props) {
      return props.lifeNode.children;
    },
    getVariables(props, paginationInfo, fragmentVariables) {
      return {
        ...paginationInfo,
        plantID: fragmentVariables.plantID
      }
    }
  },
)
