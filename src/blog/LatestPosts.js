import React from 'react';
import { List, ListItem, ListItemText, ListItemSecondaryAction, Typography, Paper, withStyles } from '@material-ui/core';
import { createFragmentContainer } from 'react-relay';
import { Link as RouterLink } from 'found';
import query from './LatestPosts.query.js';
import { RelativeDate } from '../ui';
import ProfileLink from '../accounts/ProfileLink.js';

function LatestPosts(props) {
  const {classes, viewer: {allPosts: {edges: posts}}} = props;
  return <Paper className={classes.root}>
    <Typography component="h3" variant="h5" className={classes.title}>Últimas atualizações</Typography>
    <List>
      {posts.map(({node: post}) => {
        return <ListItem key={post.id} button component={RouterLink} to={`/blog/${post.url}`}>
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
      })}
    </List>
  </Paper>
}

const styles = (theme) => ({
  root: {
  },
  title: {
    padding: theme.spacing(2, 2, 0, 2),
  },
  actionRoot: {
    right: theme.spacing(2),
  },
})

export default createFragmentContainer(
  withStyles(styles)(LatestPosts),
  query
)
