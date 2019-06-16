import React from 'react';
import Route from './relay/RouteWithLoading';
import { Grid, withStyles } from '@material-ui/core';
import { Width } from './ui'
import HomeQuery from './Home.query.js';
import LatestWhatIsThis from './occurrences/identify/LatestWhatIsThis.js';
import LatestPosts from './blog/LatestPosts.js';
import TopPlants from './plants/TopPlants.js';

function Home(props) {
	const {viewer} = props;
  return <Width component="footer">
		<Grid container spacing={3} alignItems="flex-start">
			<Grid item xs={6}>
        <LatestWhatIsThis viewer={viewer} environment={props.environment} />
      </Grid>
      <Grid container item xs={6} spacing={3}>
        <Grid item xs={12}>
          <TopPlants />
        </Grid>
        <Grid item xs={12}>
          <LatestPosts viewer={viewer} />
        </Grid>
			</Grid>
		</Grid>
	</Width>
}

const styles = {
}

const HomeStyled = withStyles(styles)(Home)

export const homeRoute = <Route
	query={HomeQuery}
  render={(args) => <HomeStyled {...args.props} environment={args.environment} />}
/>
