import React, { useState } from 'react';
import Helmet from 'react-helmet';
import { Card, CardHeader, CardActionArea, CardContent,
  Chip, Grid, Paper, Typography, withStyles } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import DoneIcon from '@material-ui/icons/Done';
import HistoryIcon from '@material-ui/icons/History';
import { useSnackbar } from 'notistack';
import { useRouter } from 'found';
import { Link as RouterLink } from 'found';
import PageTitle from '../lib/PageTitle.js';
import { RelativeDate, Width } from '../ui';
import ProfileLink from '../accounts/ProfileLink.js';
import ButtonWithProgress from '../lib/ButtonWithProgress.js';
import { useLoginRequired } from '../accounts/LoginRequired.js';
import RevisionRevertMutation from './RevisionRevert.mutation.js';

function RevisionItem
(props) {
  const {environment, classes, revision} = props;
  const object = revision.object;
  const { isAuthenticated } = useLoginRequired();
  const { enqueueSnackbar } = useSnackbar();
  const [isSaving, setIsSaving] = useState(false)
  const { router } = useRouter();

  function handleRevisionRevert(e) {
    e.preventDefault()
    setIsSaving(true)
    if (isAuthenticated()) {
      RevisionRevertMutation.commit(
        environment,
        {
          id: revision.id,
        },
        {
          onSuccess: () => {
            enqueueSnackbar('Revisão revertida com sucesso', {variant: "success"})
            setIsSaving(false)
            router.push(`/revisions/revision/${revision.id}`)
          },
          onError: () => {
            enqueueSnackbar('Ocorreu um erro', {variant: "error"})
            setIsSaving(false)
          }
        }
      )
    }
  }

  let revision_body = '';
  let before, after;
  const revision_pretty_text = [];
  revision_pretty_text['LifeNode'] = "Planta";
  revision_pretty_text['CommonName'] = "Nome em comum";
  revision_pretty_text['Tag'] = "Tag";
  revision_pretty_text['Post'] = "Postagem";
  revision_pretty_text['Comment'] = "Comentário";
  revision_pretty_text['Vote'] = "Voto";
  revision_pretty_text['User'] = "Usuário";
  revision_pretty_text['Image'] = "Foto";
  revision_pretty_text['Occurrence'] = "Ocorrência";
  revision_pretty_text['Page'] = "Página";
  revision_pretty_text['Suggestion'] = "Sugestão";
  revision_pretty_text['SuggestionID'] = "Sugestão";

  if(object.__typename === 'Comment') {
    var comment = object;

    revision_body = (<Typography variant="body2" component="p">{comment.body}</Typography>);
  }

  if(object.__typename === 'Post') {
    var post = object;

    revision_body = (<div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <PageTitle>{post.title}</PageTitle>
        </Grid>
        <Grid item xs={12}>
          Enviada por <ProfileLink user={post.revisionCreated.author} /> <RelativeDate date={post.publishedAt} /><span>. </span>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2" component="p">{post.body}</Typography>
        </Grid>
      </Grid>
    </div>);
  }

  if(object.__typename === 'Page') {
    var page = object;

    revision_body = (<div>
      <PageTitle>{page.title}</PageTitle>
      <div className={classes.actions}>
        Enviada por <ProfileLink user={page.revisionCreated.author} />
        {` `}
        <RelativeDate date={page.publishedAt} />
        <span>. </span>
      </div>
      <div>
        <Typography variant="body2" component="p">{page.body}</Typography>
      </div>
    </div>);
  }

  // prev and next revision buttons
  if(revision.before !== null) {
    before = (<Card className={classes.card}>
      <CardActionArea to={`/revisions/revision/${revision.before.id}`} component={RouterLink}>
        <CardContent>
          <div className={classes.arrowPrev}>
            <ArrowBackIcon /> 
          </div>
          <div className={classes.arrowPrev}>
            <Typography gutterBottom variant="subtitle1" component="b">
              Alteração anterior
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {revision.before.author && <span>feita por <ProfileLink user={revision.before.author} /></span>} <RelativeDate date={revision.before.createdAt} />
            </Typography>
          </div>
        </CardContent>
      </CardActionArea>
    </Card>);
  }

  if(revision.after.edges.length > 0) {
    after = (<div>{revision.after.edges.map(function(edge, i){
      var after_rev = edge.node;
      return (<Card className={classes.card} key={i}>
          <CardActionArea to={`/revisions/revision/${after_rev.id}`} component={RouterLink}>
            <CardContent>
              <div className={classes.arrowNext}>
                <Typography gutterBottom variant="subtitle1" component="b">
                  Próxima alteração
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {after_rev.author && <span>feita por <ProfileLink user={after_rev.author} /></span>} <RelativeDate date={after_rev.createdAt} />
                </Typography>
              </div>
              <div className={classes.arrowNext}>
                <ArrowForwardIcon />
              </div>
            </CardContent>
          </CardActionArea>
        </Card>);
    })}</div>);
  }

  let current, not_current_alert;
  if(revision.isTip) {
    current = (<p>
      <Chip
        icon={<DoneIcon />}
        label="Atual"
        size="small"
        className={classes.isCurrent}
      />
    </p>);
  } else {
    current = (<p>
      <ButtonWithProgress
        variant="contained"
        color="primary"
        size="small"
        onClick={handleRevisionRevert}
        isLoading={isSaving}
      >
         <HistoryIcon className={classes.leftIcon} /> reverter para esta versão
      </ButtonWithProgress>
    </p>);
    not_current_alert = (<Paper className={classes.alert}>
          Você está visualizando a {revision.typeDisplay.toLowerCase()} <b>{revision.idInt}</b> feita por <ProfileLink user={revision.author} /> <RelativeDate date={revision.createdAt} />. 
          Esta revisão pode ser muito diferente da última feita na página.
        </Paper>)
  }

  return <Width>
    <Helmet title={`Revisão: ${revision.id}`} />
    {not_current_alert}
    <Card className={classes.cardRoot}>
      <CardHeader
        disableTypography={true}
        className={classes.cardHeader}
        title={`${revision_pretty_text[revision.object.__typename]}: ${revision.id}`}
      />
      <CardContent>
        {current}
        {revision_body}
      </CardContent>
    </Card>
    <Grid container spacing={10}>
      <Grid item xs={6}>
        {before}
      </Grid>
      <Grid item xs={6} className={classes.textRight}>
        {after}
      </Grid>
    </Grid>
  </Width>
}

const styles = (theme) => ({
  root: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  cardRoot: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  cardHeader: {
    borderBottom: 'solid 1px #d6d6d6',
  },
  isCurrent: {
    background: '#4caf50',
    color: '#FFF',
  },
  alert: {
    background: '#fff3cd',
    padding: theme.spacing(2),
    color: '#000',
  },
  textRight: {
    textAlign: 'right',
  },
  arrowPrev: {
    display: 'inline-block',
    padding: '0 5px',
    verticalAlign: 'middle'
  },
  arrowNext: {
    display: 'inline-block',
    padding: '0 5px',
    verticalAlign: 'middle'
  },
  leftIcon: {
    marginRight: theme.spacing(1),
  },
})

export default withStyles(styles)(RevisionItem
  )
