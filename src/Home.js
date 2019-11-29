import React from 'react';
import Route from './relay/RouteWithLoading';
import { Grid, Paper, Typography, withStyles } from '@material-ui/core';
import { Width } from './ui'
import HomeQuery from './Home.query.js';
import LatestWhatIsThis from './occurrences/identify/LatestWhatIsThis.js';
import PostList from './blog/PostList.js';
import TopPlants from './plants/TopPlants.js';
import HomeMap from './HomeMap.js';

function Home(props) {
	const {classes, viewer} = props;
  return <div><HomeMap environment={props.environment} />
  <Width component="div">
		<Grid container spacing={3} alignItems="flex-start">
      <Grid item xs={12} sm={6}>
        <Typography component="h3" variant="h5" className={classes.titleWhat}>Últimos pedidos de identificação</Typography>
        <LatestWhatIsThis identified={false} viewer={viewer} environment={props.environment} />
      </Grid>
      <Grid container item xs={12} sm={6}>
        <Grid item xs={12} className={classes.gridPaddingBottom}>
          <TopPlants />
        </Grid>
        <Grid item xs={12}>
          <Paper>
            <Typography component="h3" variant="h5" className={classes.title}>Últimas atualizações</Typography>
            <PostList viewer={viewer} title="Últimas atualizações" count={10} />
          </Paper>
        </Grid>
			</Grid>
		</Grid>
	</Width></div>
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
  }
})

const HomeStyled = withStyles(styles)(Home)

export const homeRoute = <Route
	query={HomeQuery}
  render={(args) => <HomeStyled {...args.props} environment={args.environment} />}
/>
