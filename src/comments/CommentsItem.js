import React from 'react';
import { Card, CardHeader, CardContent, CardActions,
  Typography,Menu, MenuItem, ListItemIcon, Avatar,
  Button, IconButton, Chip, withStyles } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ReplyIcon from '@material-ui/icons/Reply';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { createFragmentContainer } from 'react-relay';
import { RelativeDate } from '../ui';
import VotingButtons from '../voting/VotingButtons.js';
import ProfileLink from '../accounts/ProfileLink';
import query from './CommentsItem.query.js'


function CommentItem(props) {
	const {classes, comment} = props;
  const [anchorEl, setAnchorEl] = React.useState(null)

  function handleOpen(e) {
    setAnchorEl(e.currentTarget)
  }

  function handleClose() {
    setAnchorEl(null)
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
            onClick={handleClose}
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
            <MenuItem>
              <ListItemIcon><EditIcon /></ListItemIcon>
              <Typography>Editar</Typography>
            </MenuItem>
            <MenuItem>
              <ListItemIcon><DeleteIcon /></ListItemIcon>
              <Typography>Excluir</Typography>
            </MenuItem>
          </Menu>
        </React.Fragment>
      }
      title={<ProfileLink user={comment.revisionCreated.author} />}
      subheader={<RelativeDate date={comment.revisionCreated.createdAt} />}
    />
    <CardContent>
      <Typography variant="body2" component="p">
        {comment.body}
      </Typography>
    </CardContent>
    <CardActions>
      <VotingButtons voting={comment.voting} parentId={comment.id} />
      <Button size="small" >
        <ReplyIcon /> responder
      </Button>
    </CardActions>
	</Card>
}

const styles = (theme) => ({
  mb1: {
    marginBottom: theme.spacing(2),
  },
})

export default createFragmentContainer(
  withStyles(styles)(CommentItem),
  query
);