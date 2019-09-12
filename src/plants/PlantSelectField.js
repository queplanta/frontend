import React, { useState, useEffect } from 'react';
import { createRefetchContainer } from 'react-relay';
import { TextField, List, ListItem, ListItemText, ListItemAvatar,
  ListItemSecondaryAction, LinearProgress, Paper, IconButton,
  ClickAwayListener, withStyles
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import _ from 'lodash';
import { useFormInput, clearFormInput } from '../lib/forms.js';
import { query, refetchQuery } from './PlantSelectField.query.js';
import ImgDefault from './PlantImgDefault.js';

function PlantSelectField(props) {
  const {classes, relay, onChange, viewer: {allLifeNode: {edges: plants}}} = props;
  const searchField = useFormInput('')
  const [showResults, setShowResults] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [disposable, setDisposable] = useState(null)
  const [typingTimeout, setTypingTimeout] = useState(null)
  const [selectedPlant, setSelectedPlant] = useState(null)

  useEffect(() => {
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    if (disposable) {
      disposable.dispose(); // TO DO: this is not canceling the request, just ignoring server's response
    }

    if (searchField.value.length > 5) {
      setLoading(true)
      setTypingTimeout(setTimeout(() => {
        setDisposable(relay.refetch(fragmentVariables => ({
          count: 10,
          search: searchField.value
        }), null, (error, se) => {
          if (error) {
            console.error(error)
          }
          setShowResults(true)
          setLoading(false)
        }));
      }, 1000))
    }
  }, [searchField.value]);

  function closeResults() {
    setShowResults(false)
  }

  function selectPlant(plant) {
    clearFormInput(searchField)
    setShowResults(false)
    setSelectedPlant(plant)
    onChange(plant)
  }

  function deselectPlant() {
    setSelectedPlant(null)
    onChange(null)
  }

  return <ClickAwayListener onClickAway={closeResults}>
    <div className={classes.selectWraper}>
      {selectedPlant && <List component={Paper}>
        <PlantItem plant={selectedPlant} classes={classes} deselectPlant={deselectPlant} />
      </List>}

      {!selectedPlant && <TextField
        label="Espécie"
        placeholder="mangifera indica, plinia cauliflora, plinia cauliflora..."
        type="text"
        margin="normal"
        variant="outlined"
        fullWidth
        className={classes.searchField}
        {...searchField}
      />}

      {((showResults || isLoading) && !selectedPlant) && <List component={Paper} className={classes.results} onClick={closeResults}>
        {plants.map(({node: plant}) => {
          return <PlantItem key={plant.id} plant={plant} classes={classes} button onClick={() => selectPlant(plant)} />
        })}
        {isLoading && <ListItem><ListItemText><LinearProgress /></ListItemText></ListItem>}
      </List>}
    </div>
  </ClickAwayListener>
}

function PlantItem(props) {
  const {plant, classes, button, deselectPlant, ...otherProps} = props
  let mainImage = _.get(plant, 'images.edges[0].node');
  return <ListItem button={button} {...otherProps}>
    <ListItemAvatar>
      {mainImage ? <img
        src={mainImage.mainImage.url}
        alt={plant.image}
        className={classes.itemImg}              
      /> : <ImgDefault className={classes.itemImg} />}
    </ListItemAvatar>
    <ListItemText
      primary={plant.title}
      secondary={plant.rankDisplay}
      className={classes.itemText}
    />
    {deselectPlant && <ListItemSecondaryAction>
      <IconButton edge="end" aria-label="delete" onClick={deselectPlant}>
        <DeleteIcon />
      </IconButton>
    </ListItemSecondaryAction>}
  </ListItem>
}

const styles = (theme) => ({
  selectWraper: {
    position: 'relative',
  },
  searchField: {
    marginTop: 0,
  },
  itemText: {
    paddingLeft: theme.spacing(2),
  },
  itemImg: {
    width: 56,
    height: 56,
    display: 'block',
  },
  results: {
    position: 'absolute',
    zIndex: 1100,
    width: '100%',
    maxHeight: 400,
    overflow: 'auto',
  }
});
export default createRefetchContainer(
  withStyles(styles)(PlantSelectField),
  query,
  refetchQuery
);
