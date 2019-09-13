import React from 'react';
import {
  ListItem, ListItemText, ListItemAvatar,
  ListItemSecondaryAction,
  Avatar,
  withStyles
} from '@material-ui/core';
import { createFragmentContainer } from 'react-relay';
import query from './SuggestionItem.query.js';
// import { RelativeDate } from '../../ui';
// import ProfileLink from '../../accounts/ProfileLink.js';
import PlantLink from '../../plants/PlantLink.js';
import VotingButtons from '../../voting/VotingButtons.js';

function SuggestionItem(props) {
  const {suggestionID: suggestion} = props;

  console.log('SuggestionItem', suggestion)

  return <ListItem>
    <ListItemAvatar>
      <Avatar
        alt={suggestion.author.username}
        src={suggestion.author.avatar.url}
      />
    </ListItemAvatar>
    <ListItemText>
      <PlantLink plant={suggestion.identity} />
    </ListItemText>
    <ListItemSecondaryAction>
      <VotingButtons voting={suggestion.voting} parentId={suggestion.id} />
    </ListItemSecondaryAction>
  </ListItem>
}

const styles = (theme) => ({})

export default createFragmentContainer(
  withStyles(styles)(SuggestionItem),
  query
)
