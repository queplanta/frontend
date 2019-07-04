import React from 'react';
import { Typography, Divider, Link, Badge, withStyles }  from '@material-ui/core';
import ProfileLink from '../accounts/ProfileLink.js';
import { Link as RouterLink } from 'found';
import { RelativeDate } from '../ui';
import query from './RevisionBox.query.js';
import { createFragmentContainer } from 'react-relay';

function RevisionBox(props) {
  const {classes, document} = props

  return <div>
      <Typography
        color="textPrimary"
        display="block"
        variant="caption"
      >
        Cadastrado por <ProfileLink user={document.revisionCreated.author} hideAvatar={true} />
      </Typography>
      <Typography
        color="textSecondary"
        display="block"
        variant="caption"
      >
        <RelativeDate date={document.revisionCreated.createdAt} />
      </Typography>
      <Typography
        color="textPrimary"
        display="block"
        variant="caption"
      >
        Última alteração por <ProfileLink user={document.revisionTip.author} hideAvatar={true} />
      </Typography>      
      <Typography
        color="textSecondary"
        display="block"
        variant="caption"
      >
        <RelativeDate date={document.revisionTip.createdAt} />
      </Typography>
      <Divider variant="fullWidth" className={classes.dividerMargin} />
      <Typography
        color="textPrimary"
        display="block"
        variant="caption"
      >
        
        <Badge classes={{badge: classes.margin}} badgeContent={document.revisionsCount} max={999} color="primary">
          <Link to={`/revisions/${document.id}`} className={classes.padding} component={RouterLink}>Historico de alterações </Link>
        </Badge>
      </Typography>
    </div>
}


const styles = (theme) => ({
  dividerMargin: {
    margin: theme.spacing(1, 0),
  },
  margin: {
    marginTop: theme.spacing(1),
  },
  padding: {
    paddingRight: theme.spacing(2),
  },
})

export default createFragmentContainer(
  withStyles(styles)(RevisionBox),
  query
);