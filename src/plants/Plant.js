import React from 'react';
import Helmet from 'react-helmet';
import { Paper, Typography, Grid, Button, Hidden, Box, withStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { Width } from '../ui';
import _ from 'lodash';
import PageTitle from '../lib/PageTitle.js';
import EdibilityBadge from './EdibilityBadge.js'
import RankDisplay from './RankDisplay.js'
import RevisionBox from '../revisions/RevisionBox.js'
import NotFound from '../pages/NotFound.js'
import ImgDefault from './PlantImgDefault.js';
import { TabsRoute, TabRoute } from '../lib/Tabs.js';

function Plant(props) {
  const {classes, plant, children} = props

  if (!plant) {
    return <NotFound />
  }

  const baseUrl = `/${plant.slug}-p${plant.idInt}`;
  const mainImage = _.get(plant, 'mainImage.edges[0].node');

  return <Width>
    <Helmet
      title={plant.title}
    />
    <PageTitle>{plant.title}</PageTitle>
    <Grid container spacing={3}>
      <Grid item xs={12} md={3}>
        <Paper className={classes.root}>
          <div>
            {mainImage ? <img
              src={mainImage.bigImage.url}
              alt={plant.title}
              width="100%"
            /> : <ImgDefault alt={plant.title} width="100%" />}
          </div>
          <EdibilityBadge plant={plant} />
          <Hidden smUp>
            <Button variant="contained" color="primary" className={classes.customBtn} fullWidth={true}>
              <AddIcon className={classes.leftIcon} />
              Adicionar à lista
            </Button>
            <Button variant="contained" color="primary" className={classes.customBtn} fullWidth={true}>
              <AddIcon className={classes.leftIcon} />
              Ocorrência
            </Button>
            <Button variant="contained" color="secondary" className={classes.customBtn} fullWidth={true}>
              <AddIcon className={classes.leftIcon} />
              Tenho semente
            </Button>
          </Hidden>
        </Paper>
        <Paper className={classes.marginBottom}>
          <RankDisplay plant={plant} />
        </Paper>
        <Paper className={classes.root}>
          <RevisionBox document={plant.document} />   
        </Paper>
      </Grid>  
      <Grid item xs={12} md={9}>
        <Paper className={classes.marginBottom}>
          <TabsRoute
            indicatorColor="primary"
            textColor="primary"
          >
            <TabRoute label="Descrição" wrapped value={baseUrl} />
            <TabRoute label="Ocorrências" wrapped value={`${baseUrl}/ocorrencias`} />
            {/*<TabRoute label="Usos" wrapped />
            <TabRoute label="Listas" wrapped />
            <TabRoute label="Trocas e Vendas" wrapped />*/}
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
  </Width>
}

const styles = (theme) => ({
  root: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  marginBottom: {
    marginBottom: theme.spacing(2),
  },
  customBtn: {
    marginBottom: theme.spacing(1),
    textAlign: "left",
  },
  leftIcon: {
    marginRight: theme.spacing(1),
  },
})

export default withStyles(styles)(Plant)
