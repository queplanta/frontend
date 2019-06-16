import React from 'react';
import {
  Card, CardContent, CardHeader,
  Avatar, IconButton,
  withStyles
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
// import { Link as RouterLink } from 'found';
import { createFragmentContainer } from 'react-relay';
import query from './WhatIsThis.query.js';
// import {RelativeDate} from '../../ui';
import ProfileLink from '../../accounts/ProfileLink.js';

function WhatIsThis(props) {
  const {classes, occurrence} = props;
  return <Card classes={{root: classes.root}}>
    <CardHeader
      avatar={<Avatar
        className={classes.avatar}
        alt={occurrence.revisionCreated.author.username}
        src={occurrence.revisionCreated.author.avatar.url}
      />}
      action={
        <IconButton aria-label="Settings">
          <MoreVertIcon />
        </IconButton>
      }
      title={<ProfileLink user={occurrence.revisionCreated.author} hideAvatar={true} />}
      subheader="September 14, 2016"
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
      {occurrence.where}
      {occurrence.when}
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
    height: 500,
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
