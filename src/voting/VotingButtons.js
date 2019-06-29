import React, { useState } from 'react';
import {
  IconButton, Badge,
  withStyles
} from '@material-ui/core';
import ThumbDownAlt from '@material-ui/icons/ThumbDownAlt';
import ThumbUpAlt from '@material-ui/icons/ThumbUpAlt';
import { createFragmentContainer } from 'react-relay';
import query from './VotingButtons.query.js';
import VoteSetMutation from './VotingButtons.voteSet.mutation.js';
import VoteDeleteMutation from './VotingButtons.voteDelete.mutation.js';

function useVote(parendId, initialValue, environment) {
  const [vote, stateVoteSet] = useState(initialValue);

	function onClick(value) {
    console.log('vote', vote)
    console.log('value', value)
    if (vote && vote.value === value) {
      VoteDeleteMutation.commit(
        environment,
        {
          id: vote.id,
        },
        {
          stateVoteSet
        }
      )
    } else {
      VoteSetMutation.commit(
        environment,
        {
          value: value,
          parent: parendId,
        },
        {
          stateVoteSet
        }
      )
    }
	}

  return [vote, onClick];
}

function VotingButtons(props) {
  const {voting: {countUps, countDowns, mine}, } = props;
	const [myVote, setVote] = useVote(props.parentId, mine, props.relay.environment)

  return <span>
    <IconButton variant="outlined" color="primary" onClick={() => {setVote(1)}}>
      <Badge badgeContent={countUps}>
        <ThumbUpAlt />
      </Badge>
    </IconButton>
    <IconButton variant="outlined" color="secondary" onClick={() => {setVote(-1)}}>
      <Badge badgeContent={countDowns}>
        <ThumbDownAlt />
      </Badge>
    </IconButton>
  </span>
}

const styles = (theme) => ({
})

export default createFragmentContainer(
  withStyles(styles)(VotingButtons),
  query
)
