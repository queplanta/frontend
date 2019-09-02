import React from 'react';
import {
  Card, CardContent, CardHeader,
  Avatar, IconButton, Menu, MenuItem,
  withStyles
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
// import { Link as RouterLink } from 'found';
import { createFragmentContainer } from 'react-relay';
import query from './WhatIsThis.query.js';
import { RelativeDate } from '../../ui';
import ProfileLink from '../../accounts/ProfileLink.js';
import SuggestionsList from './SuggestionsList.js';
import DeleteButton from '../DeleteButton.js';
import { hasPerm } from '../../lib/perms.js';

function WhatIsThisMenu(props) {
  const {occurrence, environment} = props
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }


  return <React.Fragment>
    <IconButton aria-label="Settings" aria-haspopup="true" onClick={handleClick}>
      <MoreVertIcon />
    </IconButton>
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleClose}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      {hasPerm(occurrence, 'delete') && <DeleteButton component={MenuItem} environment={environment} occurrence={occurrence} />}
    </Menu>
  </React.Fragment>
}

function WhatIsThis(props) {
  const {classes, occurrence, environment} = props;
  return <Card classes={{root: classes.root}} elevation={3}>
    <CardHeader
      avatar={<Avatar
        className={classes.avatar}
        alt={occurrence.revisionCreated.author.username}
        src={occurrence.revisionCreated.author.avatar.url}
      />}
      action={
        <WhatIsThisMenu occurrence={occurrence} environment={environment} />
      }
      title={<ProfileLink user={occurrence.revisionCreated.author} hideAvatar={true} />}
      subheader={<RelativeDate prefix="Publicado" date={occurrence.revisionCreated.createdAt} />}
    />
    <div className={classes.imagesWrapper}>
      {occurrence.images.edges.map((edge) => {
        const image = edge.node
        return <div
          key={image.id}
          className={classes.imageContainer}
        >
          <img
            className={classes.media}
            src={image.bigImage.url}
          />
        </div>
      })}
    </div>
    <CardContent>
      {occurrence.where} {occurrence.when}
    </CardContent>
    <CardContent>
      <SuggestionsList occurrence={occurrence} environment={environment} />
    </CardContent>
  </Card>
}

const styles = (theme) => ({
  root: {
    margin: theme.spacing(0, 0, 2, 0),
  },
  imagesWrapper: {
    maxHeight: 500,
  },
  imageContainer: {
    width: '100%',
    height: 300,
    position: 'relative',
    display: 'inline-block',
    overflow: 'hidden',
    margin: 0,
  },
  media: {
    display: 'block',
    position: 'absolute',
    top: '50%',
    left: '50%',
    minHeight: '100%',
    minWidth: '100%',
    transform: 'translate(-50%, -50%)',
  },
})

export default createFragmentContainer(
  withStyles(styles)(WhatIsThis),
  query
)
