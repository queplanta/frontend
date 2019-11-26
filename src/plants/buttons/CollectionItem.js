import React, { useState } from 'react';
import { createFragmentContainer } from 'react-relay';
import { withStyles } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import { useSnackbar } from 'notistack';
import ButtonWithProgress from '../../lib/ButtonWithProgress.js';
import { useLoginRequired } from '../../accounts/LoginRequired.js';
import CollectionItemAddMutation from './CollectionItemAdd.mutation.js';
import CollectionItemDeleteMutation from './CollectionItemDelete.mutation.js';
import fragmentSpec from './CollectionItemToggle.query.js';

function CollectionItem(props) {
  const {relay: {environment}, classes, plant} = props;
  const { isAuthenticated } = useLoginRequired();
  const { enqueueSnackbar } = useSnackbar();
  const [isSaving, setIsSaving] = useState(false);
  const isSelected = plant.myCollectionItem !== null;

  function handleAdd(e) {
    e.preventDefault()
    setIsSaving(true)
    if (isAuthenticated()) {
      if (!isSelected) {
        CollectionItemAddMutation.commit(
          environment,
          {
            plantId: plant.id,
          },
          {
            onSuccess: () => {
              enqueueSnackbar(`${plant.title} adicionado(a) com sucesso a sua lista de "Quero ter"`, {variant: "success"})
              setIsSaving(false)
            },
            onError: () => {
              enqueueSnackbar('Ocorreu um erro', {variant: "error"})
              setIsSaving(false)
            }
          }
        )
      } else {
        CollectionItemDeleteMutation.commit(
          environment,
          {
            id: plant.myCollectionItem.id,
          },
          {
            onSuccess: () => {
              enqueueSnackbar(`${plant.title} removido(a) com sucesso da sua lista de "Quero ter"`, {variant: "success"})
              setIsSaving(false)
            },
            onError: () => {
              enqueueSnackbar('Ocorreu um erro', {variant: "error"})
              setIsSaving(false)
            }
          }
        )
      }
    }
  }

  return <ButtonWithProgress
    variant="contained"
    color="primary"
    size="small"
    className={isSelected ? classes.active : classes.root}
    isLoading={isSaving}
    onClick={handleAdd}>
    <CheckIcon className={classes.leftIcon} /> Tenho
  </ButtonWithProgress>
}

const styles = (theme) => ({
  root: {
    backgroundColor: '#a6b7a7',
    color: '#FFF',
    '&:hover': {
      backgroundColor: '#689a6a',
    },
  },
  active: {
    backgroundColor: '#4caf50',
    color: '#FFF',
    '&:hover': {
      backgroundColor: '#388e3c',
    },
  },
  leftIcon: {
    marginRight: theme.spacing(1),
  },
})

export default createFragmentContainer(
  withStyles(styles)(CollectionItem),
  fragmentSpec
);
