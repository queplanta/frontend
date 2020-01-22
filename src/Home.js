import React from 'react';
import Route from './relay/RouteWithLoading';
import { withStyles } from '@material-ui/core';
import { Width } from './ui'
import HomeQuery from './Home.query.js';
import OccurrencesMap from './occurrences/OccurrencesMap.js';

function Home(props) {
	const {classes, environment} = props;
  return <Width component="div">
    <OccurrencesMap className={classes.map} environment={environment} />
	</Width>
}

const styles = (theme) => ({
  titleWhat: {
    paddingBottom: theme.spacing(2),
  },
  title: {
    padding: theme.spacing(2, 2, 0, 2),
  },
  gridPaddingBottom: {
    paddingBottom: theme.spacing(2),
  },
  map: {
    height: 500,
  },
})

const HomeStyled = withStyles(styles)(Home)

export const homeRoute = <Route
	query={HomeQuery}
  render={(args) => <HomeStyled {...args.props} environment={args.environment} />}
/>
