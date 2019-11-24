import React, { useState } from 'react';
import { withStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import CheckIcon from '@material-ui/icons/Check';
import { useSnackbar } from 'notistack';
import ButtonWithProgress from '../../lib/ButtonWithProgress.js';
import { useLoginRequired } from '../../accounts/LoginRequired.js';
import WishItemAddMutation from './WishItemAdd.mutation.js';

function WishItem(props) {
  const {environment, classes, plant} = props;
  const { isAuthenticated } = useLoginRequired();
  const { enqueueSnackbar } = useSnackbar();
  const [isSaving, setIsSaving] = useState(false)

  function handleAdd(e) {
    e.preventDefault()
    setIsSaving(true)
    if (isAuthenticated()) {
      WishItemAddMutation.commit(
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
    }
  }

  return <ButtonWithProgress
      variant="contained"
      color="secondary"
      size="small"
      className={classes.root}
      isLoading={isSaving}
      onClick={handleAdd}>
      <AddIcon /> Quero ter
    </ButtonWithProgress>
}

const styles = (theme) => ({
  root: {
    backgroundColor: '#1976d2',
    color: '#FFF',
    '&:hover': {
      backgroundColor: '#0f5192',
    },
  },
})

export default withStyles(styles)(WishItem)