import React, { useState } from 'react';
import Helmet from 'react-helmet';
import moment from 'moment'
import { Grid, TextField, withStyles } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { useRouter } from 'found';
import { Width } from '../ui';
import { hasFormErrors, FormErrors } from '../FormErrors.js';
import PostEditMutation from './PostEdit.mutation.js';
import { useFormInput } from '../lib/forms.js';
import PageTitle from '../lib/PageTitle.js';
import ButtonWithProgress from '../lib/ButtonWithProgress.js';

function PostEdit({environment, setFormErrors, post}) {
  const { enqueueSnackbar } = useSnackbar();
  const { router } = useRouter();

  console.log(post)

  const url = useFormInput(post.url)
  const title = useFormInput(post.title)
  const publishedAt = useFormInput(moment(post.publishedAt).format('YYYY-MM-DDTHH:mm:ss'))
  const body = useFormInput(post.body)
  const tags = useFormInput(post.tags.edges.map(edge => edge.node.title).join(', '))

  const [isSaving, setIsSaving] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    PostEditMutation.commit(
      environment,
      {
        id: post.id,
        url: url.value,
        title: title.value,
        publishedAt: publishedAt.value,
        body: body.value,
        tags: tags.value,
      },
      {
        setFormErrors,
        onSuccess: () => {
          enqueueSnackbar('Editado com sucesso', {variant: "success"})
          setIsSaving(false)
          router.push(`/blog/${url.value}`)
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
      title={`Editando Post: ${post.title}`}
    />
    <Grid container spacing={3} component="form" onSubmit={handleSubmit}>
      <Grid item xs={12}>
        <PageTitle>{`Editando Post: ${post.title}`}</PageTitle>
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
        <TextField
          label="Tags"
          fullWidth
          {...tags}
        />
      </Grid>
      <Grid item xs={12}>
        <ButtonWithProgress type="submit" variant="contained" color="primary" isLoading={isSaving}>Salvar</ButtonWithProgress>
      </Grid>
    </Grid>
  </Width>
}

export default withStyles({})(hasFormErrors(PostEdit))
