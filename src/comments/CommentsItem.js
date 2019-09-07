import React from 'react';
import { Card, CardHeader, CardContent, CardActions,
  Typography,Menu, MenuItem, ListItemIcon, ListItemText, Avatar,
  Button, IconButton, Chip, LinearProgress, withStyles } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ReplyIcon from '@material-ui/icons/Reply';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { createRefetchContainer } from 'react-relay';
import { RelativeDate } from '../ui';
import VotingButtons from '../voting/VotingButtons.js';
import ProfileLink from '../accounts/ProfileLink';
import { query, refetchQuery } from './CommentsItem.query.js';
import CommentCreate from './CommentCreate.js';
import CommentEdit from './CommentEdit.js';
import CommentsReplies from './CommentsReplies.js';
import CommentDeleteMutation from './CommentDelete.mutation.js';
import DeleteButton from '../lib/DeleteButton.js';
import { hasPerm } from '../lib/perms.js';


function CommentItem(props) {
  const {classes, comment, relay} = props;
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [replyFormExpanded, setReplyFormExpanded] = React.useState(false)
  const [repliesExpanded, setReplyRepliesExpanded] = React.useState(false)
  const [isLoadingReplies, setLoadingReplies] = React.useState(false)
  const [editing, setEditing] = React.useState(false)

  function focusReplyForm() {
    setReplyFormExpanded(true)
    showReplies()
  }

  function showReplies() {
    setLoadingReplies(true)
    relay.refetch(fragmentVariables => ({
        id: comment.id,
        isRepliesExpanded: true
      }), null, (error) => {
        if (error) {
          console.error(error)
        } else {
          setReplyRepliesExpanded(true)
        }
        setLoadingReplies(false)
      }
    )
  }

  function handleOpen(e) {
    setAnchorEl(e.currentTarget)
  }

  function handleClose() {
    setAnchorEl(null)
  }

  function startEditing() {
    setEditing(true)
    handleClose()
  }

  function renderBody() {
    if (editing) {
      return <CommentEdit
        closeForm={() => {setEditing(false)}}
        environment={relay.environment}
        comment={comment}
      />
    } else {
      return <Typography variant="body2" component="p">
        {comment.body}
      </Typography>;
    }
  }

  return <Card className={classes.mb1}>
    <CardHeader
      avatar={
        <Avatar
          alt={comment.revisionCreated.author.username}
          src={comment.revisionCreated.author.avatar.url} />
      }
      action={
        <React.Fragment>
          <IconButton aria-label="settings" onClick={handleOpen}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            getContentAnchorEl={null}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem>
              <ListItemIcon><Chip size="small" label={comment.document.revisionsCount} /></ListItemIcon>
              <Typography>Alterações</Typography>
            </MenuItem>
            <MenuItem onClick={startEditing}>
              <ListItemIcon><EditIcon /></ListItemIcon>
              <Typography>Editar</Typography>
            </MenuItem>
            {hasPerm(comment, 'delete') && <DeleteButton component={MenuItem} environment={relay.environment} node={comment} mutation={CommentDeleteMutation}>
              <ListItemIcon><DeleteIcon /></ListItemIcon>
              <ListItemText>Excluir</ListItemText>
            </DeleteButton>}
          </Menu>
        </React.Fragment>
      }
      title={<ProfileLink user={comment.revisionCreated.author} />}
      subheader={<RelativeDate date={comment.revisionCreated.createdAt} />}
    />
    <CardContent>
      {renderBody()}
    </CardContent>
    <CardActions className={classes.cardActions}>
      <VotingButtons voting={comment.voting} parentId={comment.id} />
      <Button size="small" onClick={focusReplyForm}>
        <ReplyIcon /> responder
      </Button>
      {comment.commenting.count > 0 && <Button fullWidth className={classes.repliesCountButton} classes={{label: classes.repliesCountButtonLabel}} onClick={showReplies}>{`${comment.commenting.count} respostas`}</Button>}
    </CardActions>
    {(isLoadingReplies || replyFormExpanded || repliesExpanded) && <CardContent>
      {replyFormExpanded && <CommentCreate parentId={comment.commenting.id} environment={relay.environment} focusInput={true} />}
      {repliesExpanded && <CommentsReplies commenting={comment.commenting} parentId={comment.id} />}
      {isLoadingReplies && <LinearProgress />}
    </CardContent>}
  </Card>
}

const styles = (theme) => ({
  mb1: {
    marginBottom: theme.spacing(2),
  },
  cardActions: {
    display: 'block',
  },
  repliesCountButton: {
    boxShadow: 'none',
    marginLeft: 0,
    backgroundColor: '#e0e0e0',
  },
  repliesCountButtonLabel: {
    justifyContent: 'left'
  },
})

export default createRefetchContainer(
  withStyles(styles)(CommentItem),
  query,
  refetchQuery
);
