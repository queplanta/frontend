import React, { useState, useRef, useEffect } from 'react';
import { TextField, Button, withStyles } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { hasFormErrors, FormErrors } from '../FormErrors.js';
import { useFormInput } from '../lib/forms.js';
import ButtonWithProgress from '../lib/ButtonWithProgress.js';
import CommentEditMutation from './CommentEdit.mutation.js';

function CommentEdit({comment, closeForm, classes, environment, setFormErrors, focusInput}) {
  const { enqueueSnackbar } = useSnackbar();
  const body = useFormInput(comment.body)
  const bodyEl = useRef(null)
  const [isSaving, setIsSaving] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    setIsSaving(true)
    CommentEditMutation.commit(
      environment,
      {
        body: body.value,
        id: comment.id
      },
      {
        setFormErrors,
        onSuccess: () => {
          setIsSaving(false)
          enqueueSnackbar('Comentário editado com sucesso', {variant: "success"})
          closeForm()
        },
        onError: () => {
          enqueueSnackbar('Ocorreu um erro', {variant: "error"})
          setIsSaving(false)
        }
      }
    )
  }

  useEffect(() => {
    if (bodyEl) {
      bodyEl.current.focus();
    }
  }, []);

  return <form onSubmit={handleSubmit} className={classes.form}>
    <FormErrors filter={(error) => ["__all__", null].indexOf(error.location) >= 0} />
    <TextField
      placeholder="seu comentário"
      fullWidth
      multiline
      required
      variant="outlined"
      inputRef={bodyEl}
      {...body}
    />
    <ButtonWithProgress variant="outlined" className={classes.button} type="submit" isLoading={isSaving}>salvar alteração</ButtonWithProgress>
    <Button onClick={closeForm} variant="outlined" className={classes.button}>Cancelar</Button>
  </form>
}

const styles = (theme) => ({
  form: {},
  button: {
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(2),
  } 
})
export default withStyles(styles)(hasFormErrors(CommentEdit))
