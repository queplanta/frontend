import React from 'react';
import { Box, Grid, Typography, Hidden, withStyles } from '@material-ui/core';
import { Width } from '../ui';
import { TabsRoute, TabRoute } from '../lib/Tabs.js';

function ProfileSettings(props) {
  const {children, classes} = props
  const baseUrl = "/conta";
  
  return <Width>
    <Grid container spacing={3}>
      <Grid item md={3}>
        <Hidden smDown implementation="css">
          <TabsRoute
            orientation="vertical"
            indicatorColor="primary"
            textColor="primary"
            className={classes.tabs}
          >
            <TabRoute classes={{wrapper: classes.tabRouteWrapper}} label="Editar perfil" wrapped value={`${baseUrl}/editar`} />            
            <TabRoute classes={{wrapper: classes.tabRouteWrapper}} label="Alterar senha" wrapped value={`${baseUrl}/editar/senha`} />
            <TabRoute classes={{wrapper: classes.tabRouteWrapper}} label="Alterar imagem de exibição" wrapped value={`${baseUrl}/editar/avatar`} />
          </TabsRoute>
        </Hidden>
      </Grid>      
      <Grid item xs={12} md={9}>
        <Typography
          component="div"
          role="tabpanel"
        >
          <Box>{children}</Box>
        </Typography>
      </Grid>
    </Grid>
  </Width>
}

const styles = (theme) => ({
  link: {
    marginLeft: theme.spacing(2),
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    minHeight: 440
  },
  tabRouteWrapper: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
  }
});

export default withStyles(styles)(ProfileSettings)
