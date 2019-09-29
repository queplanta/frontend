import React, { useState } from 'react';
import Helmet from 'react-helmet';
import moment from 'moment'
import { Grid, TextField, withStyles } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { useRouter } from 'found';
import { Width } from '../ui';
import { hasFormErrors, FormErrors } from '../FormErrors.js';
import PageCreateMutation from './PageCreate.mutation.js';
import { useFormInput } from '../lib/forms.js';
import PageTitle from '../lib/PageTitle.js';
import ButtonWithProgress from '../lib/ButtonWithProgress.js';

function PageCreate({environment, setFormErrors}) {
  const { enqueueSnackbar } = useSnackbar();
  const { router } = useRouter();

  const url = useFormInput('')
  const title = useFormInput('')
  const publishedAt = useFormInput(moment().format('YYYY-MM-DDTHH:mm:ss'))
  const body = useFormInput('')

  const [isSaving, setIsSaving] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    PageCreateMutation.commit(
      environment,
      {
        url: url.value,
        title: title.value,
        publishedAt: publishedAt.value,
        body: body.value,
      },
      {
        setFormErrors,
        onSuccess: () => {
          enqueueSnackbar('Criada com sucesso', {variant: "success"})
          setIsSaving(false)
          router.push(`/${url.value}`)
        },
        onError: () => {
          enqueueSnackbar('Ocorreu um erro', {variant: "error"})
          setIsSaving(false)
        }
      }
    )
  }

  return <Width>
    <Helmet
      title="Escrever nova Página"
    />
    <Grid container spacing={3} component="form" onSubmit={handleSubmit}>
      <Grid item xs={12}>
        <PageTitle>Escrever nova Página</PageTitle>
        <FormErrors filter={(error) => ["__all__", null].indexOf(error.location) >= 0} />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="URL"
          fullWidth
          required
          {...url}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Title"
          fullWidth
          required
          {...title}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Published At"
          fullWidth
          required
          {...publishedAt}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Body"
          fullWidth
          multiline
          required
          {...body}
        />
      </Grid>
      <Grid item xs={12}>
        <ButtonWithProgress type="submit" variant="contained" color="primary" isLoading={isSaving}>Salvar</ButtonWithProgress>
      </Grid>
    </Grid>
  </Width>
}

export default withStyles({})(hasFormErrors(PageCreate))
