import React from 'react';
import Helmet from 'react-helmet';
import { Card, CardHeader, CardActionArea, CardContent,
  Grid, Paper, SnackbarContent, Typography, withStyles } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import PageTitle from '../lib/PageTitle.js';
import { Link as RouterLink } from 'found';
import { RelativeDate, Width } from '../ui';
import ProfileLink from '../accounts/ProfileLink.js';


function RevisionItem
(props) {
  const {classes, revision} = props;
  const object = revision.object;
  let revision_body = '';
  let before, after;

  if(object.__typename === 'Comment') {
    var comment = object;

    revision_body = (<div>
      <p>
        <b>Comentário: {comment.id}</b>
      </p>
      {comment.body}
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
              feita por <ProfileLink user={revision.before.author} /> <RelativeDate date={revision.before.createdAt} />
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
                  feita por <ProfileLink user={after_rev.author} /> <RelativeDate date={after_rev.createdAt} />
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

  return <Width>
    <Helmet title={`Revisão: ${revision.id}`} />

    <Paper className={classes.alert}>
      Você está visualizando a alteração <b>{revision.idInt}</b> feita por <ProfileLink user={comment.revisionCreated.author} /> <RelativeDate date={comment.revisionCreated.createdAt} />. 
      Esta edição pode ser muito diferente da última edição feita na página.
    </Paper>
    <Card>
      <CardHeader
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      />
      {revision_body}
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
  }
})

export default withStyles(styles)(RevisionItem
  )
