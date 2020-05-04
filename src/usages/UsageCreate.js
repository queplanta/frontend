import React, { useState } from 'react';
import Helmet from 'react-helmet';
import { useRouter } from 'found';
import { Grid, TextField, MenuItem, withStyles } from '@material-ui/core';
import { useSnackbar } from 'notistack';
// import { hasPerm } from '../lib/perms.js';
import { useFormInput } from '../lib/forms.js';
import { hasFormErrors, FormErrors, TextFieldWithError } from '../FormErrors.js';
import ButtonWithProgress from '../lib/ButtonWithProgress.js';
import PlantSelectField from '../plants/PlantSelectField.js';
import JsxPreviewField from '../lib/JsxPreviewField.js';
import UsageCreateMutation from './UsageCreate.mutation.js';

function UsageCreate(props) {
  const {match, classes, usageTypes, environment, setFormErrors} = props
  const { enqueueSnackbar } = useSnackbar();
  const { router } = useRouter();

  const [lifeNode, setLifeNode] = useState(null)
  const [isSaving, setIsSaving] = useState(false)

  const title = useFormInput('')
  const body = useFormInput('')
  const types = useFormInput('')
  const source = useFormInput('')

  function handleSubmit(e) {
    e.preventDefault()
    UsageCreateMutation.commit(
      environment,
      {
        plants: [lifeNode.id],
        types: [types.value],
        title: title.value,
        body: body.value,
        source: source.value,
      },
      {
        setFormErrors,
        onSuccess: (response) => {
          enqueueSnackbar('Uso adicionado com sucesso', {variant: "success"})
          setIsSaving(false)
          router.push(`/usos/${response.usageCreate.usage.id}`)
        },
        onError: () => {
          enqueueSnackbar('Ocorreu um erro', {variant: "error"})
          setIsSaving(false)
        }
      }
    )
  }

  return <Grid container spacing={3} component="form" onSubmit={handleSubmit}>
    <Helmet
      title="Adicionar um uso"
    />
    <FormErrors filter={(error) => ["__all__", null].indexOf(error.location) >= 0} />
    <Grid item xs={12}>
      <PlantSelectField required preselectedIds={match.location.query.plant} environment={environment} onChange={setLifeNode} value={lifeNode} />
    </Grid>
    <Grid item xs={12}>
      <TextFieldWithError
        margin="dense"
        label="Tipo"
        errorFilter={{location: "types"}}
        fullWidth
        select
        required
        {...types}
      >
        {usageTypes.enumValues.map((e, i) => {
          return (<MenuItem key={i} value={e.name}>{e.description}</MenuItem>);
        })}
      </TextFieldWithError>
    </Grid>
    <Grid item xs={12}>
      <TextField
        label="Título"
        fullWidth
        required
        {...title}
      />
    </Grid>
    <Grid item xs={12}>
      <JsxPreviewField
        environment={environment}
        label="Body"
        fullWidth
        multiline
        required
        {...body}
      />
    </Grid>
    <Grid item xs={12}>
      <TextField
        label="Fonte"
        fullWidth
        required
        {...source}
      />
    </Grid>
    <Grid item xs={12}>
      <ButtonWithProgress
        type="submit"
        variant="contained"
        color="primary"
        isLoading={isSaving}
      >Salvar</ButtonWithProgress>
    </Grid>
  </Grid>
}

const styles = (theme) => ({
  marginBottom: {
    marginBottom: theme.spacing(2),
  },
})

export default withStyles(styles)(hasFormErrors(UsageCreate))
