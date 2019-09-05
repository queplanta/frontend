import React from 'react';
import { withStyles } from '@material-ui/core';
import { createFragmentContainer } from 'react-relay';
import CommentsItem from './CommentsItem.js';
import query from './CommentsList.query.js';

function CommentsList(props) {
  const {commenting} = props
  return <div>
    {commenting.comments.edges.map((edge) => {
      const comment = edge.node;
      return (
        <CommentsItem key={comment.id} comment={comment} />
      )
    })}
  </div>
}

const styles = {}

export default createFragmentContainer(
  withStyles(styles)(CommentsList),
  query
)