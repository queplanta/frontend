import React from 'react';
import { Typography, Paper, Link, withStyles } from '@material-ui/core';
import { Link as RouterLink } from 'found';
import Markdown from 'react-remarkable';
import { RelativeDate, Width } from '../ui';
import ProfileLink from '../accounts/ProfileLink.js';
import NotFound from './NotFound.js'

const markdownOptions = {
  html: true,
};

function Page(props) {
  const {classes, page} = props

  if (!page) {
    return <NotFound />
  }

  return <Width>
    <Paper className={classes.root}>
      <Typography component="h1" variant="h4" className={classes.title}>{page.title}</Typography>
      <div className={classes.actions}>
        Enviada por <ProfileLink user={page.revisionCreated.author} />
        {` `}
        <i className="fa fa-clock-o" aria-hidden="true" />
        {` `}
        <RelativeDate date={page.publishedAt} />
        <span> . </span>
        <Link component={RouterLink} to={`/revisions/${page.id}`}>{page.document.revisionsCount} alterações</Link>
      </div>
      <div>
        <Markdown options={markdownOptions} container="div">{page.body}</Markdown>
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
  }
})

export default withStyles(styles)(Page)
