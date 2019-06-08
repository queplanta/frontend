import React from 'react';
import { Typography, Paper, Link, Tabs, Tab, Badge, withStyles } from '@material-ui/core';
import { Link as RouterLink } from 'found';
import Markdown from 'react-remarkable';
import { Width } from '../ui';
import ProfileLink from '../accounts/ProfileLink.js';
import NotFound from '../pages/NotFound.js'

const markdownOptions = {
  html: true,
};

function Plant(props) {
  const {classes, plant} = props

  if (!plant) {
    return <NotFound />
  }

  return <Width>
    <Paper className={classes.root}>
      <Typography component="h1" variant="h4" className={classes.title}>{plant.title}</Typography>
      <div>
        <Tabs value="main" indicatorColor="primary" textColor="primary">
          <Tab value="main" label="Descrição" />
          <Tab value="photos" label={
            <Badge className={classes.tabBadge} badgeContent={4} color="primary">
              Fotos
            </Badge>}
          />
          <Tab label="Ocorrências" />
        </Tabs>
        <Markdown options={markdownOptions} container="div">{plant.description}</Markdown>
      </div>
      <div className={classes.actions}>
        Enviada por <ProfileLink user={plant.revisionCreated.author} />
        {` `}
        <i className="fa fa-clock-o" aria-hidden="true" />
        {` `}
        <span> . </span>
        <Link component={RouterLink} to={`/revisions/${plant.id}`}>{plant.document.revisionsCount} alterações</Link>
      </div>
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
  tabBadge: {
    padding: theme.spacing(0, 2),
  },
})

export default withStyles(styles)(Plant)
