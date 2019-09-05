import React from 'react';
import Helmet from 'react-helmet';
import moment from 'moment'
import { Grid, Typography, TextField, Button, withStyles } from '@material-ui/core';
import { Width } from '../ui';
import { hasFormErrors, FormErrors } from '../FormErrors.js';
import PostCreateMutation from './PostCreate.mutation.js';
import { useFormInput } from '../lib/forms.js';

function PostCreate({environment, setFormErrors}) {
  const url = useFormInput('')
  const title = useFormInput('')
  const publishedAt = useFormInput(moment().format('YYYY-MM-DDTHH:mm:ss'))
  const body = useFormInput('')
  const tags = useFormInput('')

  function handleSubmit(e) {
    e.preventDefault()
    PostCreateMutation.commit(
			environment,
			{
				url: url.value,
				title: title.value,
				publishedAt: publishedAt.value,
				body: body.value,
				tags: tags.value,
			},
			{
				setFormErrors
			}
		)
  }

  return <Width>
    <Helmet
      title="Escrever novo Post"
    />
    <Grid container spacing={3} component="form" onSubmit={handleSubmit}>
      <Grid item xs={12}>
        <Typography component="h5" variant="h2" gutterBottom>Escrever novo Post</Typography>
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
        <Button type="submit" variant="contained" color="primary">Salvar</Button>
      </Grid>
    </Grid>
  </Width>
}

export default withStyles({})(hasFormErrors(PostCreate))
