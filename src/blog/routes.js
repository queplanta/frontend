import React from 'react';
import Route from '../relay/RouteWithLoading';
import Post from './Post.js';
import PostQuery from './Post.query.js';
import PostCreate from './PostCreate.js';
import PostCreateQuery from './PostCreate.query.js';

export const blogRoutes = <React.Fragment>
  <Route
    path="/blog/new"
    query={PostCreateQuery}
    render={(props) => <PostCreate {...props} />}
  />
  <Route
    path="/blog/:url"
    query={PostQuery}
    Component={Post}
  />
</React.Fragment>
