import React from 'react';
import {
  Card, CardContent, CardHeader,
  Avatar, MenuItem,
  withStyles
} from '@material-ui/core';
import { createFragmentContainer } from 'react-relay';
import query from './WhatIsThis.query.js';
import { RelativeDate } from '../../ui';
import ProfileLink from '../../accounts/ProfileLink.js';
import SuggestionsList from './SuggestionsList.js';
import OccurrenceDeleteMutation from '../OccurrenceDelete.mutation.js';
import DeleteButton from '../../lib/DeleteButton.js';
import MenuButton from '../../lib/MenuButton.js';
import { hasPerm } from '../../lib/perms.js';
import ImageThumbnail from '../../lib/ImageThumbnail.js';

function WhatIsThis(props) {
  const {classes, occurrence, environment} = props;
  const menuRef = React.useRef()
  const numImages = occurrence.images.edges.length;
  let imgPercentWidth = 100.0 / numImages;
  if (imgPercentWidth < 33) {
    imgPercentWidth = 33.3;
  }
  return <Card classes={{root: classes.root}} elevation={3}>
    <CardHeader
      avatar={<Avatar
        className={classes.avatar}
        alt={occurrence.revisionCreated.author.username}
        src={occurrence.revisionCreated.author.avatar.url}
      />}
      action={
        <MenuButton ref={menuRef}>
          {hasPerm(occurrence, 'delete') && <DeleteButton component={MenuItem} environment={environment} node={occurrence} mutation={OccurrenceDeleteMutation} />}
        </MenuButton>
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
          style={{width: `${imgPercentWidth}%`}}
        >
          <ImageThumbnail
            alt="foto de planta para ser identificada"
            image={image}
            className={classes.media}
            src={image.smallImage.url}
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
    overflow: 'unset',
  },
  imagesWrapper: {
    lineHeight: '0',
  },
  imageContainer: {
    width: '100%',
    height: 200,
    position: 'relative',
    display: 'inline-block',
    overflow: 'hidden',
    margin: 0,
    [theme.breakpoints.up('sm')]: {
      height: 300,
    }
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
