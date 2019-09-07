import React, { useState } from 'react';
import {
  IconButton, Badge,
  withStyles
} from '@material-ui/core';
import { fade } from '@material-ui/core/styles';
import ThumbDownAlt from '@material-ui/icons/ThumbDownAlt';
import ThumbUpAlt from '@material-ui/icons/ThumbUpAlt';
import { createFragmentContainer } from 'react-relay';
import clsx from 'clsx';
import query from './VotingButtons.query.js';
import VoteSetMutation from './VotingButtons.voteSet.mutation.js';
import VoteDeleteMutation from './VotingButtons.voteDelete.mutation.js';

function useVote(parendId, initialValue, environment) {
  const [vote, stateVoteSet] = useState(initialValue);

	function onClick(value) {
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
  const {classes, voting: {countUps, countDowns, mine}} = props;
	const [myVote, setVote] = useVote(props.parentId, mine, props.relay.environment)

  function isMyVote(value) {
    return myVote && myVote.value === value
  }

  return <span>
    <IconButton variant="outlined" color="primary" onClick={() => {setVote(1)}} className={clsx({[classes.activeUp]: isMyVote(1)})}>
      <Badge badgeContent={countUps}>
        <ThumbUpAlt />
      </Badge>
    </IconButton>
    <IconButton variant="outlined" color="secondary" onClick={() => {setVote(-1)}} className={clsx({[classes.activeDown]: isMyVote(-1)})}>
      <Badge badgeContent={countDowns}>
        <ThumbDownAlt />
      </Badge>
    </IconButton>
  </span>
}

const styles = (theme) => ({
  activeUp: {
    backgroundColor: fade(theme.palette.primary.main, 0.3),
  },
  activeDown: {
    backgroundColor: fade(theme.palette.secondary.main, 0.3),
  }
})

export default createFragmentContainer(
  withStyles(styles)(VotingButtons),
  query
)
