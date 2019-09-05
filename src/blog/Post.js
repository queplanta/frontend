import React from 'react';
import Helmet from 'react-helmet';
import Markdown from 'react-remarkable';
import { Link, Grid, withStyles } from '@material-ui/core';
import { Link as RouterLink } from 'found';
import { RelativeDate, Width } from '../ui';
import PageTitle from '../lib/PageTitle.js';
import ProfileLink from '../accounts/ProfileLink';
import VotingButtons from '../voting/VotingButtons.js';
import CommentsList from '../comments/CommentsList.js';

function Post(props) {
  const {post} = props;
  const markdownOptions = {
    html: true,
  };

  return <Width>
    <Helmet
      title={post.title}
    />
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <PageTitle>{post.title}</PageTitle>
      </Grid>
      <Grid item xs={12}>
        Enviada por <ProfileLink user={post.revisionCreated.author} /> <RelativeDate date={post.publishedAt} /><span>. </span>
        <Link to={`/revisions/${post.id}`} component={RouterLink}>{post.document.revisionsCount} alterações</Link>.
      </Grid>
      <Grid item xs={12}>
        <Markdown options={markdownOptions} container="div">{post.body}</Markdown>
      </Grid>
      <Grid item xs={12}>
        <VotingButtons voting={post.voting} parentId={post.id} />
      </Grid>
      <Grid item xs={12}>
        <CommentsList commenting={post.commenting} />
      </Grid>
    </Grid>
  </Width>
}

const styles = {}

export default withStyles(styles)(Post)
