import React from 'react';
import { Paper, Typography, Grid, Button, withStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { Width } from '../ui';
import EdibilityBadge from './EdibilityBadge.js'
import RankDisplay from './RankDisplay.js'
import NotFound from '../pages/NotFound.js'

function Plant(props) {
  const {classes, plant} = props

  if (!plant) {
    return <NotFound />
  }  

  return <Width>
    <Paper className={classes.root}>
      <Typography component="h1" variant="h4" className={classes.title}>{plant.title}</Typography>
      <Grid item xs={12} md={3}>
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
        <div>
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
        </div>
        <RankDisplay plant={plant} />
      </Grid>      
    </Paper>
  </Width>
}

const styles = (theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  title: {
    marginBottom: theme.spacing(2),
  },
  actions: {
    borderBottom: `1px solid ${theme.palette.grey['500']}`,
    paddingBottom: theme.spacing(1),
    color: theme.palette.grey['600'],
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
