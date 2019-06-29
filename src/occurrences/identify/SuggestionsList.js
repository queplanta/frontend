import React from 'react';
import {
  List, ListItem, ListItemText, ListItemAvatar,
  ListItemSecondaryAction,
  Avatar, Typography, TextField, Divider,
  withStyles
} from '@material-ui/core';
// import { Link as RouterLink } from 'found';
import { createFragmentContainer } from 'react-relay';
import query from './SuggestionsList.query.js';
// import { RelativeDate } from '../../ui';
// import ProfileLink from '../../accounts/ProfileLink.js';
import VotingButtons from '../../voting/VotingButtons.js';

function SuggestionsList(props) {
  const {classes, occurrence: {suggestions: {edges: items}}} = props;
  return <div>
    <Typography component="h4" variant="h6" className={classes.title}>Que espécie é esta?</Typography>
    <List>
      {items.map((edge, i) => {
        const suggestion = edge.node;
        return <React.Fragment key={suggestion.id}>
          {i > 0 && <Divider component="li" />}
          <ListItem>
            <ListItemAvatar>
              <Avatar
                alt={suggestion.author.username}
                src={suggestion.author.avatar.url}
              />
            </ListItemAvatar>
            <ListItemText>
              {suggestion.identity.title}
            </ListItemText>
            <ListItemSecondaryAction>
              <VotingButtons voting={suggestion.voting} parentId={suggestion.id} />
            </ListItemSecondaryAction>
          </ListItem>
        </React.Fragment>
      })}
    </List>
    <TextField
      variant="outlined"
      label="Sugerir espécie"
      fullWidth
    />
    {/*<QueryRenderer
      environment={environment}
      query={query}
      variables={{
        count: 10,
        after: '',
      }}
      render={({error, props}) => {
        if (error) {
          return <div><h1>Error!</h1><br />{error}</div>;
        }

        if (props) {
          return <WhatIsThisListPaginated {...props} environment={environment} />
        }

        return <div className={classes.loading}><CircularProgress /></div>
      }}
    />*/}
  </div>
}

const styles = (theme) => ({
})

export default createFragmentContainer(
  withStyles(styles)(SuggestionsList),
  query
)
