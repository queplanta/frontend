import React, { useState } from 'react';
import { withStyles } from '@material-ui/core';
import { createPaginationContainer } from 'react-relay';
import ButtonWithProgress from '../lib/ButtonWithProgress.js';
import CommentsItem from './CommentsItem.js';
import CommentCreate from './CommentCreate.js';
import { fragmentQuery, query } from './CommentsList.query.js';

function CommentsList(props) {
  const {relay, commenting: {id: parentId, comments: {edges: comments}}} = props

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
    <CommentCreate parentId={parentId} environment={relay.environment} />
    {comments.map(({node: comment}) => {
      return comment ? <CommentsItem key={comment.id} comment={comment} /> : null
    })}
    {hasMore && <ButtonWithProgress variant="outlined" isLoading={isLoading} onClick={handleLoadMore}>... mais comentários</ButtonWithProgress>}
  </div>
}

const styles = {}

export default createPaginationContainer(
  withStyles(styles)(CommentsList),
  fragmentQuery,
  {
    direction: 'forward',
    query: query,
    getConnectionFromProps(props) {
      return props.commenting.comments;
    },
    getVariables(props, paginationInfo, fragmentVariables) {
      return {
        ...paginationInfo,
        nodeID: props.commenting.id,
      }
    }
  }

)
