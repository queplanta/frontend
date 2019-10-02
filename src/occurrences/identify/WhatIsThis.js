import React from 'react';
import {
  Card, CardContent, CardHeader,
  Avatar, MenuItem,
  withStyles
} from '@material-ui/core';
import { createFragmentContainer } from 'react-relay';
import { Link as RouterLink } from 'found';
import fragmentSpec from './WhatIsThis.query.js';
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
  const numImagesIsEven = numImages % 2 === 0;

  let numImagesColumns = numImages
  if (!numImagesIsEven) {
    numImagesColumns = numImages - 1
  }

  let imgPercentWidth = 100.0 / numImagesColumns;
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
      subheader={<RouterLink to={`/ocorrencias/${occurrence.id}`} className={classes.relativeDateLink}><RelativeDate prefix="Publicado" date={occurrence.revisionCreated.createdAt} /></RouterLink>}
    />
    <div className={classes.imagesWrapper}>
      {occurrence.images.edges.map((edge, i) => {
        const isFirst = i === 0
        const image = edge.node
        return <ImageThumbnail
          key={image.id}
          alt="foto de planta para ser identificada"
          image={image}
          className={classes.media}
          src={image.smallImage.url}
          style={{width: `${!numImagesIsEven && isFirst ? 100 : imgPercentWidth}%`}}
        />
      })}
    </div>
    <CardContent>
      {occurrence.where} {occurrence.when} {occurrence.notes}
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
  media: {
    border: '3px solid transparent',
  },
  relativeDateLink: {
    color: theme.palette.text.secondary,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline'
    }
  }
})

export default createFragmentContainer(
  withStyles(styles)(WhatIsThis),
  fragmentSpec
)
