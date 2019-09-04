import React from 'react';
import Helmet from 'react-helmet';
import { Paper, Typography, Grid, Button, Hidden, Tabs, Tab, Box, withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import AddIcon from '@material-ui/icons/Add';
import { Width } from '../ui';
import EdibilityBadge from './EdibilityBadge.js'
import RankDisplay from './RankDisplay.js'
import RevisionBox from '../revisions/RevisionBox.js'
import NotFound from '../pages/NotFound.js'
import PlantLink from '../plants/PlantLink.js';
import TaxoClimb from './TaxoClimb.js';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

function Plant(props) {
  const {classes, plant} = props
  const [currentTab, setTab] = React.useState('description');

  if (!plant) {
    return <NotFound />
  }  

  return <Width>
    <Helmet
      title={plant.title}
    />
    <Typography component="h1" variant="h4" className={classes.title}>{plant.title}</Typography>
    <Grid container spacing={3}>
      <Grid item xs={12} md={3}>
        <Paper className={classes.root}>
          {plant.images.edges.map((edge) => {
            const mainImage = edge.node
            return <div key={mainImage.id}>
              <img
              src={mainImage.bigImage.url}
              alt={mainImage.description}
              width="100%"
              />
            </div>
          })}
          <EdibilityBadge plant={plant} />
          <Hidden smUp>
            <Button variant="contained" color="primary" className={classes.customBtn} fullWidth={true}>
              <AddIcon className={classes.leftIcon} />
              Adicionar à lista
            </Button>
            <Button variant="contained" color="primary" className={classes.customBtn} color="primary" fullWidth={true}>
              <AddIcon className={classes.leftIcon} />
              Ocorrência
            </Button>
            <Button variant="contained" color="secondary" className={classes.customBtn} color="primary" fullWidth={true}>
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
          <Tabs
            value={currentTab}
            onChange={(e, value) => {setTab(value)}}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab value="description" label="Descrição" wrapped {...a11yProps('description')} />
            <Tab value="ocurrences" label="Ocorrências" wrapped {...a11yProps('ocurrences')} />
            <Tab value="uses" label="Usos" wrapped {...a11yProps('uses')} />
            <Tab value="lists" label="Listas" wrapped {...a11yProps('lists')} />
            <Tab value="deals-and-sales" label="Trocas e Vendas" wrapped {...a11yProps('deals-and-sales')} />
          </Tabs>
          <TabPanel value={currentTab} index="description">
            <Typography variant="body1" className={classes.marginBottom}>{plant.description}</Typography>
            <Typography variant="h6">Nomes comuns</Typography>
            <ol>
              {plant.commonNames.edges.map((edge) => {
                const commonName = edge.node
                return <li key={commonName.id}>
                  { commonName.name} {commonName.language ? `(${commonName.language})` : ''}
                </li>
              })}
            </ol>
            <TaxoClimb lifeNode={plant} />
            <Typography variant="h6">Sinônimos</Typography>
            <Typography variant="h6">Referências</Typography>
          </TabPanel>
          <TabPanel value={currentTab} index="ocurrences">
            OCORRENCIAS
          </TabPanel>
          <TabPanel value={currentTab} index="uses">
            USOS
          </TabPanel>
          <TabPanel value={currentTab} index="lists">
            Listas
          </TabPanel>
          <TabPanel value={currentTab} index="deals-and-sales">
            TROCAS E VENDAS
          </TabPanel> 
        </Paper>
        <Paper className={classes.root}>
          <Typography variant="overline">Colaboradores</Typography>
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
  title: {
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
