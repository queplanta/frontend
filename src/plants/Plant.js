import React from 'react';
import { Paper, Typography, Grid, Button, Hidden, Tabs, Tab, withStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { Width } from '../ui';
import EdibilityBadge from './EdibilityBadge.js'
import RankDisplay from './RankDisplay.js'
import RevisionBox from '../revisions/RevisionBox.js'
import NotFound from '../pages/NotFound.js'

function Plant(props) {
  const {classes, plant} = props
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  if (!plant) {
    return <NotFound />
  }  

  return <Width>
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
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Descrição" />
            <Tab label="Ocorrências" />
            <Tab label="Usos" />
            <Tab label="Listas" />
            <Tab label="Trocas e Vendas" />
          </Tabs>
          
          {plant.lifeNodeCommonname.edges.map((edge) => {
            const commonname = edge.node
            return <div key={commonname.id}>
              { commonname.title}
            </div>
          })}
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
