import React from 'react';
import {
  IconButton, Badge,
  withStyles
} from '@material-ui/core';
import ThumbDownAlt from '@material-ui/icons/ThumbDownAlt';
import ThumbUpAlt from '@material-ui/icons/ThumbUpAlt';
import { createFragmentContainer } from 'react-relay';
import query from './VotingButtons.query.js';

function VotingButtons(props) {
  const {voting: {countUps, countDowns}} = props;
  return <span>
    <IconButton variant="outlined" color="primary">
      <Badge badgeContent={countUps}>
        <ThumbUpAlt />
      </Badge>
    </IconButton>
    <IconButton variant="outlined" color="secondary">
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
