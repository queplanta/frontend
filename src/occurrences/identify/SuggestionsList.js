import React, { useState } from 'react';
import {
  List, Typography, Divider, TextField,
  withStyles
} from '@material-ui/core';
// import { Link as RouterLink } from 'found';
import { createFragmentContainer } from 'react-relay';
import { useSnackbar } from 'notistack';
import ButtonWithProgress from '../../lib/ButtonWithProgress.js';
import { hasFormErrors, FormErrors } from '../../FormErrors.js';
import { useFormInput, clearFormInput } from '../../lib/forms.js';
import SuggestionItem from './SuggestionItem.js';
import SuggestionAddMutation from './SuggestionAdd.mutation.js';
import query from './SuggestionsList.query.js';
import PlantSelectField from '../../plants/PlantSelectField.js';

function SuggestionsList(props) {
  const {enqueueSnackbar} = useSnackbar()
  const [isSaving, setIsSaving] = useState(false)
  const {classes, environment, setFormErrors, occurrence: {id: occurrenceId, suggestions: {edges: items}}} = props;
  const [selectedPlant, setPlant] = useState(null);
  const notes = useFormInput('')

  function onSuccess() {
    setIsSaving(false)
    enqueueSnackbar('Sugestão adicionada com sucesso', {variant: "success"})
    clearFormInput(notes)
    setPlant(null)
  }

  function onSubmit(e) {
    e.preventDefault()
    SuggestionAddMutation.commit(
			environment,
			{
        occurrence: occurrenceId,
        identity: selectedPlant.id,
				notes: notes.value,
			},
			{
				setFormErrors,
        onSuccess,
        onError: () => {
          enqueueSnackbar('Ocorreu um erro', {variant: "error"})
          setIsSaving(false)
        }
			}
		)
  }

  return <div>
    <Typography component="h4" variant="h6" className={classes.title}>Que espécie é esta?</Typography>

    <List>
      {items.map((edge, i) => {
        const suggestion = edge.node;
        return <React.Fragment key={suggestion.id}>
          {i > 0 && <Divider component="li" />}
          <SuggestionItem suggestionID={suggestion} />
        </React.Fragment>
      })}
    </List>

    <form onSubmit={onSubmit}>
      <PlantSelectField
        environment={environment}
        onChange={setPlant}
        textFieldProps={{
          label: "Sugerir espécie",
          fullWidth: true,
        }}
      />

      {selectedPlant && <React.Fragment>
        <TextField
          label="Notas"
          variant="outlined"
          type="text"
          margin="normal"
          fullWidth
        />

        <FormErrors filter={(error) => ["__all__", null].indexOf(error.location) >= 0} />

        <ButtonWithProgress variant="contained" color="primary" type="submit" isLoading={isSaving}>Adicionar</ButtonWithProgress>
      </React.Fragment>}
    </form>
  </div>
}

const styles = (theme) => ({
})

export default createFragmentContainer(
  withStyles(styles)(hasFormErrors(SuggestionsList)),
  query
)
