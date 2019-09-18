import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, TextField, withStyles } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { hasFormErrors, FormErrors } from '../FormErrors.js';
import { useFormInput, clearFormInput } from '../lib/forms.js';
import ButtonWithProgress from '../lib/ButtonWithProgress.js';
import CommentCreateMutation from './CommentCreate.mutation.js';
import { useLoginRequired } from '../accounts/LoginRequired.js';

function CommentCreate({classes, parentId, environment, setFormErrors, focusInput}) {
  const { enqueueSnackbar } = useSnackbar()
  const { isAuthenticated } = useLoginRequired()
  const body = useFormInput('')
  const bodyEl = useRef(null)
  const [isSaving, setIsSaving] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    if (isAuthenticated()) {
      setIsSaving(true)
      CommentCreateMutation.commit(
        environment,
        {
          body: body.value,
          parent: parentId
        },
        {
          setFormErrors,
          onSuccess: () => {
            clearFormInput(body)
            setIsSaving(false)
            enqueueSnackbar('Comentário adicionado com sucesso', {variant: "success"})
          },
          onError: () => {
            enqueueSnackbar('Ocorreu um erro', {variant: "error"})
            setIsSaving(false)
          }
        }
      )
    }
  }

  useEffect(() => {
    if (focusInput && bodyEl) {
      bodyEl.current.focus();
    }
  }, []);

  return <Card component="form" onSubmit={handleSubmit} className={classes.form}>
    <CardContent classes={{root: classes.cardContent}}>
      <FormErrors filter={(error) => ["__all__", null].indexOf(error.location) >= 0} />
      <TextField
        placeholder="Deixe seu comentário"
        fullWidth
        multiline
        required
        variant="outlined"
        inputRef={bodyEl}
        {...body}
      />
      <ButtonWithProgress variant="outlined" className={classes.button} type="submit" isLoading={isSaving}>enviar comentário</ButtonWithProgress>
    </CardContent>
  </Card>
}

const styles = (theme) => ({
  form: {
    marginBottom: theme.spacing(2),
  },
  cardContent: {
    '&:last-child': {
      paddingBottom: theme.spacing(2),
    }
  },
  button: {
    marginTop: theme.spacing(2),
  } 
})
export default withStyles(styles)(hasFormErrors(CommentCreate))
