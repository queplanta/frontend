import React, { useRef, useState } from 'react';
import {
  ListItem, ListItemText, ListItemAvatar,
  ListItemSecondaryAction, Avatar,
  MenuItem, ListItemIcon, IconButton,
  withStyles
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { fade } from '@material-ui/core/styles';
import clsx from 'clsx';
import { createFragmentContainer } from 'react-relay';
import { useSnackbar } from 'notistack';
import query from './SuggestionItem.query.js';
// import { RelativeDate } from '../../ui';
// import ProfileLink from '../../accounts/ProfileLink.js';
import PlantLink from '../../plants/PlantLink.js';
import VotingButtons from '../../voting/VotingButtons.js';
import DeleteButton from '../../lib/DeleteButton.js';
import MenuButton from '../../lib/MenuButton.js';
import ButtonWithProgress from '../../lib/ButtonWithProgress.js';
import { hasPerm } from '../../lib/perms.js';
import SuggestionIDDeleteMutation from './SuggestionDelete.mutation.js';
import WhatIsThisIdentifyMutation from './WhatIsThisIdentify.mutation.js';

function SuggestionItem(props) {
  const {enqueueSnackbar} = useSnackbar();
  const {classes, relay, occurrence, suggestionID: suggestion} = props
  const menuRef = useRef()
  const [isSaving, setIsSaving] = useState(false)

  function handleVerify() {
    setIsSaving(true)
    WhatIsThisIdentifyMutation.commit(
      relay.environment,
      {
        id: occurrence.id,
        lifeId: suggestion.identity.id
      },
      {
        onSuccess: () => {
          enqueueSnackbar('Identificada com sucesso.', {variant: "success"})
          setIsSaving(false)
        },
        onError: () => {
          enqueueSnackbar('Ocorreu um erro', {variant: "error"})
          setIsSaving(false)
        }
      }
    )
  }


  // verified_user
  // check_circle
  // check_circle_outline
  const isVerified = occurrence.identity && suggestion.identity && occurrence.identity.id === suggestion.identity.id

  return <ListItem className={clsx({[classes.correctItem]: isVerified})}>
    <ListItemAvatar>
      <Avatar
        alt={suggestion.author.username}
        src={suggestion.author.avatar.url}
      />
    </ListItemAvatar>
    <ListItemText>
      <PlantLink plant={suggestion.identity} />
      {isVerified && <CheckCircleIcon className={classes.correct} />}
      {suggestion.notes && <div>{suggestion.notes}</div>}
    </ListItemText>
    <ListItemSecondaryAction>
      <VotingButtons voting={suggestion.voting} parentId={suggestion.id} />
      {hasPerm(occurrence, 'identify') && <ButtonWithProgress variant="outlined" color="primary" isLoading={isSaving} onClick={handleVerify} component={IconButton} disabled={isVerified}><CheckCircleOutlineIcon /></ButtonWithProgress>}
      <MenuButton ref={menuRef}>
        {hasPerm(suggestion, 'delete') && <DeleteButton component={MenuItem} environment={relay.environment} node={suggestion} mutation={SuggestionIDDeleteMutation}>
          <ListItemIcon><DeleteIcon /></ListItemIcon>
          <ListItemText>Excluir</ListItemText>
        </DeleteButton>}
      </MenuButton>
    </ListItemSecondaryAction>
  </ListItem>
}

const styles = (theme) => ({
  correctItem: {
    backgroundColor: fade(theme.palette.primary.main, 0.15),
  },
  correct: {
    color: theme.palette.primary.main,
    verticalAlign: 'middle',
    marginLeft: theme.spacing(1)
  }
})
export default createFragmentContainer(
  withStyles(styles)(SuggestionItem),
  query
)
