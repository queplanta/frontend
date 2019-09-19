import React from 'react';
import Helmet from 'react-helmet';
import { Paper, Typography, Grid,
  Chip, Box, withStyles } from '@material-ui/core';
import NotFound from '../pages/NotFound.js'
import { Width } from '../ui';
import { TabsRoute, TabRoute } from '../lib/Tabs.js';

function Profile(props) {
  const {classes, user, children} = props;

  if (!user) {
    return <NotFound />
  }

  const baseUrl = `/u/${user.username}`;

  return <Width>
    <Helmet
      title={user.username}
    />
    <Grid container spacing={3}>
      <Grid item xs={4} md={2}>
        <img
          alt={user.username}
          image={user.avatar}
          src={user.avatar.url}
          className={classes.profileImage}
        />
      </Grid>
      <Grid item xs={8} md={10}>
         <Typography
          color="textPrimary"
          component="h1"
          variant="h6"
        >
          {user.username}
        </Typography>
        <Chip
          size="small"
          label={`Reputação: ${user.reputation}`}
          className={classes.chip}
          color="primary"
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12}>
        <Paper className={classes.marginBottom}>
          <TabsRoute
            indicatorColor="primary"
            textColor="primary"
            className={classes.tabs}
          >
            <TabRoute label="Atividades" wrapped value={baseUrl} />
          </TabsRoute>
          <Typography
            component="div"
            role="tabpanel"
          >
            <Box p={3}>{children}</Box>
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  </Width>;
}

const styles = (theme) => ({
  profileImage: {
    // margin: 10,
    width: 80,
    height: 80,
  },
  bigProfileImage: {
    // margin: 10,
    width: 80,
    height: 80,
  },
  chip: {
    marginTop: theme.spacing(2)
  }
})

export default withStyles(styles)(Profile)