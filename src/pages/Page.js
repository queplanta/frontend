import React from 'react';
import Helmet from 'react-helmet';
import { Paper, withStyles } from '@material-ui/core';
import Markdown from 'react-remarkable';
import { RelativeDate, Width } from '../ui';
import PageTitle from '../lib/PageTitle.js';
import Link from '../lib/Link.js';
import ProfileLink from '../accounts/ProfileLink.js';
import NotFound from './NotFound.js'
import { hasPerm } from '../lib/perms.js';

const markdownOptions = {
  html: true,
};

function Page(props) {
  const {classes, page} = props

  if (!page) {
    return <NotFound />
  }

  return <Width>
    <Helmet
      title={page.title}
    />
    <Paper className={classes.root}>
      <PageTitle>{page.title}</PageTitle>
      <div className={classes.actions}>
        Enviada por <ProfileLink user={page.revisionCreated.author} />
        {` `}
        <i className="fa fa-clock-o" aria-hidden="true" />
        {` `}
        <RelativeDate date={page.publishedAt} />
        <span> . </span>
        <Link to={`/revisions/${page.id}`}>{page.document.revisionsCount} alterações</Link>
        {hasPerm(page, 'edit') && <React.Fragment>
          <span> . </span>
          <Link to={`/paginas/${page.id}/editar`}>editar</Link>
        </React.Fragment>}
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
  actions: {
    borderBottom: `1px solid ${theme.palette.grey['500']}`,
    paddingBottom: theme.spacing(1),
    color: theme.palette.grey['600'],
  }
})

export default withStyles(styles)(Page)
