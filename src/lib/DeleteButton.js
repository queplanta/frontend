import React, { useState } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import { useSnackbar } from 'notistack';
import ButtonWithProgress from '../lib/ButtonWithProgress.js';

function DeleteButton(props, ref) {
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setLoading] = useState(false);
  const {children, mutation, environment, node, classes, appendNotifications, setNotifications, ...otherProps} = props

  function onDelete() {
    setLoading(true)
    mutation.commit(
      environment,
      {
        id: node.id,
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
    {children ? children : <React.Fragment>
      <DeleteIcon fontSize="small" style={{marginRight: 10}} /> Excluir
    </React.Fragment>}
  </ButtonWithProgress>
}

export default React.forwardRef(DeleteButton)
