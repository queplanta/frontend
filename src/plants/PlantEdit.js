import React, { useState } from 'react';
import Helmet from 'react-helmet';
import { Grid, MenuItem, withStyles } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { Width } from '../ui';
import PageTitle from '../lib/PageTitle.js';
import NotFound from '../pages/NotFound.js'
import { hasFormErrors, FormErrors, TextFieldWithError } from '../FormErrors.js';
import { useFormInput } from '../lib/forms.js';
import ButtonWithProgress from '../lib/ButtonWithProgress.js';
import PlantEditMutation from './PlantEdit.mutation.js';

function Plant(props) {
  const {classes, plant, edibilities, ranks, setFormErrors, environment} = props
  const { enqueueSnackbar } = useSnackbar()

  const titleField = useFormInput(plant.title)
  const descriptionField = useFormInput(plant.description)
  const edibilityField = useFormInput(plant.edibility)
  const rankField = useFormInput(plant.rank)

  const [isSaving, setIsSaving] = useState(false)

  if (!plant) {
    return <NotFound />
  }

  function handleSubmit(e) {
    e.preventDefault()
    setIsSaving(true)
    setIsSaving(true)
    PlantEditMutation.commit(
      environment,
      {
        id: plant.id,
        title: titleField.value,
        description: descriptionField.value,
        edibility: edibilityField.value,
        rank: edibilityField.rankField,
      },
      {
        setFormErrors,
        onSuccess: () => {
          enqueueSnackbar('Editada com sucesso', {variant: "success"})
          setIsSaving(false)
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
      title={`Editando: ${plant.title}`}
    />
    <PageTitle>Editando: {plant.title}</PageTitle>
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <form onSubmit={handleSubmit}>
          <TextFieldWithError
            margin="dense"
            label="Titulo"
            errorFilter={{location: "title"}}
            required
            fullWidth
            {...titleField}
          />

          <TextFieldWithError
            margin="dense"
            label="Descrição"
            errorFilter={{location: "description"}}
            fullWidth
            multiline
            {...descriptionField}
          />

          <TextFieldWithError
            margin="dense"
            label="Comestibilidade"
            errorFilter={{location: "edibility"}}
            fullWidth
            select
            {...edibilityField}
          >
            {edibilities.enumValues.map((e, i) => {
              return (<MenuItem key={i} value={e.name}>{e.description}</MenuItem>);
            })}
          </TextFieldWithError>

          <TextFieldWithError
            margin="dense"
            label="Rank"
            errorFilter={{location: "rank"}}
            fullWidth
            select
            {...rankField}
          >
            {ranks.enumValues.map((e, i) => {
              return (<MenuItem key={i} value={e.name}>{e.description}</MenuItem>);
            })}
          </TextFieldWithError>

          <FormErrors filter={(error) => ["__all__", null].indexOf(error.location) >= 0} />

          <ButtonWithProgress variant="outlined" className={classes.button} type="submit" isLoading={isSaving}>salvar alteração</ButtonWithProgress>
        </form>
      </Grid>  
    </Grid>  
  </Width>
}

const styles = (theme) => ({
  button: {
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(2),
  }
})
export default withStyles(styles)(hasFormErrors(Plant))
