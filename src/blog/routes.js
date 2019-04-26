import React from 'react';
import Route from 'found/lib/Route';
import PostCreate from './PostCreate.js';
import PostCreateQuery from './PostCreate.query.js';

export const blogRoutes = <React.Fragment>
  <Route
    path="/blog/new"
    query={PostCreateQuery}
    render={(props) => <PostCreate {...props} />}
  />
</React.Fragment>
