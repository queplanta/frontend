import React from 'react';
import Helmet from 'react-helmet';
import { Paper, withStyles } from '@material-ui/core';
import { RelativeDate, Width } from '../ui';
import PageTitle from '../lib/PageTitle.js';
import Link from '../lib/Link.js';
import ProfileLink from '../accounts/ProfileLink.js';
import NotFound from './NotFound.js'
import { hasPerm } from '../lib/perms.js';
import JsxParser from '../lib/JsxParser.js';

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
      <JsxParser
        jsx={page.body}
      />
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
    </Paper>
  </Width>
}

const styles = (theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  actions: {
    borderTop: `1px solid ${theme.palette.grey['300']}`,
    paddingTop: theme.spacing(2),
    marginTop: theme.spacing(2),
    color: theme.palette.grey['600'],
  },
  pageBody: {

  }
})

export default withStyles(styles)(Page)
