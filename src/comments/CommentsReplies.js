import React, { useState } from 'react';
import { withStyles } from '@material-ui/core';
import { createPaginationContainer } from 'react-relay';
import ButtonWithProgress from '../lib/ButtonWithProgress.js';
import CommentsItem from './CommentsItem.js';
import { fragmentSpec, query } from './CommentsList.query.js';

function CommentsReplies(props) {
  const {relay, commenting: {comments}} = props

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

  function renderList() {
    return <React.Fragment>
      {comments.edges.map(({node: comment}) => {
        return comment ? <CommentsItem key={comment.id} comment={comment} /> : null
      })}
      {hasMore && <ButtonWithProgress variant="outlined" isLoading={isLoading} onClick={handleLoadMore}>... mais comentários</ButtonWithProgress>}
    </React.Fragment>
  }

  return <div>
    {(comments && comments.edges.length > 0) && renderList()}
  </div>
}

const styles = {}

export default createPaginationContainer(
  withStyles(styles)(CommentsReplies),
  fragmentSpec,
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
