import React from 'react';
import { ListItem, ListItemText, ListItemSecondaryAction, withStyles } from '@material-ui/core';
import { createFragmentContainer } from 'react-relay';
import { Link as RouterLink } from 'found';
import { RelativeDate } from '../ui';
import ProfileLink from '../accounts/ProfileLink.js';
import query from './PostItem.query.js';

function PostItem(props) {
  const {classes, post} = props;

  return <ListItem button component={RouterLink} to={`/blog/${post.url}`}>
    <ListItemText>{post.title}</ListItemText>
    <ListItemSecondaryAction classes={{root: classes.actionRoot}}>
      {/*<a href="#">{post.voting.countUps} gostaram</a>
      {` . `}
      <a href="#">{post.voting.countDowns} não gostaram</a>
      {` . `}
      <a href="#">{ post.commenting.count } comentarios</a>
      {` . `}*/}
      enviada por <ProfileLink user={post.revisionCreated.author} />
      {` . `}
      <RelativeDate date={post.publishedAt} />
    </ListItemSecondaryAction>
  </ListItem>
}

const styles = (theme) => ({
  actionRoot: {
    right: theme.spacing(2),
  },
})

export default createFragmentContainer(
  withStyles(styles)(PostItem),
  query
)