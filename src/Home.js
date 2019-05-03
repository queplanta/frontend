import React from 'react';
import Route from 'found/lib/Route';
import { Grid, withStyles } from '@material-ui/core';
import { Width } from './ui'
import HomeQuery from './Home.query.js';
import LatestPosts from './blog/LatestPosts.js';

function Home(props) {
	const {viewer} = props;
  return <Width component="footer">
		<Grid container spacing={24}>
			<Grid item xs={12}>
				<LatestPosts viewer={viewer} />
			</Grid>
		</Grid>
	</Width>
}

const styles = {
}

export const homeRoute = <Route
	Component={withStyles(styles)(Home)}
	query={HomeQuery}
/>
