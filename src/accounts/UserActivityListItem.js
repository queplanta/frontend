import React from 'react';
import { ListItem, ListItemText, ListItemIcon, withStyles } from '@material-ui/core';
import { createFragmentContainer } from 'react-relay';
import { Link as RouterLink } from 'found';
import { RelativeDate } from '../ui';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import fragmentSpec from './UserActivityListItem.query.js';

function UserActivityListItem(props) {
  const {revision} = props;

  let revision_icon = '';
  let revision_past_text = '';
  if(revision.type === "CREATE") {
    revision_icon = <AddIcon />;
    revision_past_text = "Adicionou";
  }
  if(revision.type === "UPDATE") {
    revision_icon = <EditIcon />;
    revision_past_text = "Editou";
  }
  if(revision.type === "DELETE") {
    revision_icon = <DeleteIcon />;
    revision_past_text = "Deletou";
  }

  const revision_pretty_text = [];
  revision_pretty_text['LifeNode'] = "uma planta";
  revision_pretty_text['CommonName'] = "um nome em comum";
  revision_pretty_text['Tag'] = "uma tag";
  revision_pretty_text['Post'] = "uma postagem";
  revision_pretty_text['Comment'] = "um comentário";
  revision_pretty_text['Vote'] = "um voto";
  revision_pretty_text['User'] = "um usuário";
  revision_pretty_text['Image'] = "uma foto";
  revision_pretty_text['Occurrence'] = "uma observação";
  revision_pretty_text['Page'] = "uma página";
  revision_pretty_text['Suggestion'] = "uma sugestão";
  revision_pretty_text['SuggestionID'] = "uma sugestão";

  if(revision.object){
    return <ListItem button component={RouterLink} to={`/revisions/revision/${revision.id}`}>
      <ListItemIcon>{revision_icon}</ListItemIcon>
      <ListItemText>{revision_past_text} {revision_pretty_text[revision.object.__typename]} </ListItemText>
      <RelativeDate date={revision.createdAt} />
    </ListItem>
  } else {
    return null;
  }

}

const styles = (theme) => ({
  card: {
    display: 'flex',
    marginBottom: theme.spacing(2),
  },
  cardAction: {
    display: 'block',
    textAlign: 'initial'
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
  },
})

export default createFragmentContainer(
  withStyles(styles)(UserActivityListItem),
  fragmentSpec
)