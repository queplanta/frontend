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
import fragmentSpec from './VotingButtons.query.js';
import VoteSetMutation from './VotingButtons.voteSet.mutation.js';
import VoteDeleteMutation from './VotingButtons.voteDelete.mutation.js';
import { useLoginRequired } from '../accounts/LoginRequired.js';
import ButtonWithProgress from '../lib/ButtonWithProgress.js';

function useVote(parendId, initialValue, environment) {
  const [isSaving, setSaving] = useState(false);
  const [vote, stateVoteSet] = useState(initialValue);
  const { isAuthenticated } = useLoginRequired();

	function onClick(value) {
    if (isAuthenticated()) {
      setSaving(true)
      if (vote && vote.value === value) {
        VoteDeleteMutation.commit(
          environment,
          {
            id: vote.id,
          },
          {
            stateVoteSet,
            onSuccess: () => {
              setSaving(false)
            },
            onError: () => {
              setSaving(false)
            }
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
            stateVoteSet,
            onSuccess: () => {
              setSaving(false)
            },
            onError: () => {
              setSaving(false)
            }
          }
        )
      }
    }
	}

  return [vote, onClick, isSaving];
}

function VotingButtons(props) {
  const {classes, voting: {countUps, countDowns, mine}} = props;
	const [myVote, setVote, isSaving] = useVote(props.parentId, mine, props.relay.environment)

  function isMyVote(value) {
    return myVote && myVote.value === value
  }

  return <span>
    <ButtonWithProgress component={IconButton} variant="outlined" color="primary" onClick={() => {setVote(1)}} className={clsx({[classes.activeUp]: isMyVote(1)})} isLoading={isSaving}>
      <Badge badgeContent={countUps}>
        <ThumbUpAlt />
      </Badge>
    </ButtonWithProgress>
    <ButtonWithProgress component={IconButton} variant="outlined" color="secondary" onClick={() => {setVote(-1)}} className={clsx({[classes.activeDown]: isMyVote(-1)})} isLoading={isSaving}>
      <Badge badgeContent={countDowns}>
        <ThumbDownAlt />
      </Badge>
    </ButtonWithProgress>
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
  fragmentSpec
)
