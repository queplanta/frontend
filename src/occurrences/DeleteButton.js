import React, { useState } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import { useSnackbar } from 'notistack';
import ButtonWithProgress from '../lib/ButtonWithProgress.js';
import OccurrenceDeleteMutation from './OccurrenceDelete.mutation.js';

function DeleteButton(props, ref) {
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setLoading] = useState(false);
  const {environment, occurrence, classes, appendNotifications, setNotifications, ...otherProps} = props

  function onDelete() {
    setLoading(true)
    OccurrenceDeleteMutation.commit(
      environment,
      {
        id: occurrence.id,
      },
      {
        onSuccess: () => {
          enqueueSnackbar('Excluído com sucesso', {variant: "success"})
        },
        onError: () => {
          enqueueSnackbar('Ocorreu um erro', {variant: "error"})
          setLoading(false)
        }
      }
    )
  }

  return <ButtonWithProgress onClick={onDelete} isLoading={isLoading} {...otherProps}>
    <DeleteIcon fontSize="small" style={{marginRight: 10}} /> Excluir
  </ButtonWithProgress>
}

export default React.forwardRef(DeleteButton)
