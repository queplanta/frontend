import React, { Component } from 'react';
import { List, ListItem, ListItemText, ListItemSecondaryAction, Typography, withStyles } from '@material-ui/core';
import { createFragmentContainer } from 'react-relay';
import { Link } from 'found';
import query from './LatestPosts.query.js';
import {RelativeDate} from '../ui';
import ProfileLink from '../accounts/ProfileLink.js';

class LatestPosts extends Component {
  render() {
		const {viewer: {allPosts: {edges: posts}}} = this.props;
    return <React.Fragment>
      <Typography component="h5" variant="h2" gutterBottom>Últimas atualizações</Typography>
        <List>
        {posts.map(({node: post}) => {
          return <ListItem key={post.id} component={Link} to={`/blog/${post.url}`}>
            <ListItemText>{post.title}</ListItemText>
            <ListItemSecondaryAction>
              <a href="#">{post.voting.countUps} gostaram</a>
              {` . `}
              <a href="#">{post.voting.countDowns} não gostaram</a>
              {` . `}
              <a href="#">{ post.commenting.count } comentarios</a>
              {` . `}
              enviada por <ProfileLink user={post.revisionCreated.author} />
              {` . `}
              <RelativeDate date={post.publishedAt} />
            </ListItemSecondaryAction>
          </ListItem>
        })}
      </List>
    </React.Fragment>
  }
}

export default createFragmentContainer(
  withStyles({})(LatestPosts),
  query
)
