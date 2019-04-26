import React, { Component } from 'react';
import Route from 'found/lib/Route';
import { withStyles } from '@material-ui/core';
import { Width } from './ui'
import HomeQuery from './Home.query.js';
import LatestPosts from './blog/LatestPosts.js';

class Home extends Component {
  render() {
    const {viewer} = this.props;
    return (
      <Width>
        <LatestPosts viewer={viewer} />
      </Width>
    );
  }
}

const styles = {
}

export const homeRoute = <Route
	Component={withStyles(styles)(Home)}
	query={HomeQuery}
/>
