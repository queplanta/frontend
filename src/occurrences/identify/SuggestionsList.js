import React, { useState } from "react";
import _ from "lodash";
import {
  List,
  Typography,
  Divider,
  TextField,
  withStyles,
} from "@material-ui/core";
// import { Link as RouterLink } from 'found';
import { createFragmentContainer } from "react-relay";
import { useSnackbar } from "notistack";
import ButtonWithProgress from "../../lib/ButtonWithProgress.js";
import { hasFormErrors, FormErrors } from "../../lib/FormErrors.js";
import { useFormInput, clearFormInput } from "../../lib/forms.js";
import SuggestionItem from "./SuggestionItem.js";
import SuggestionAddMutation from "./SuggestionAdd.mutation.js";
import fragmentSpec from "./SuggestionsList.query.js";
import PlantSelectField from "../../plants/PlantSelectField.js";
import { useLoginRequired } from "../../accounts/LoginRequired.js";

function SuggestionsList(props) {
  const { enqueueSnackbar } = useSnackbar();
  const { isAuthenticated } = useLoginRequired();
  const [isSaving, setIsSaving] = useState(false);
  const { classes, environment, setFormErrors, occurrence } = props;
  const edges = occurrence.suggestions.edges;
  const suggestionsTotalCount = occurrence.suggestions.totalCount;
  const [selectedPlant, setPlant] = useState(null);
  const notes = useFormInput("");

  function onSuccess() {
    setIsSaving(false);
    enqueueSnackbar("Sugestão adicionada com sucesso", { variant: "success" });
    clearFormInput(notes);
    setPlant(null);
  }

  function onSubmit(e) {
    e.preventDefault();
    if (isAuthenticated()) {
      setIsSaving(true);
      SuggestionAddMutation.commit(
        environment,
        {
          occurrence: occurrence.id,
          identity: selectedPlant.id,
          notes: notes.value,
        },
        {
          setFormErrors,
          onSuccess,
          onError: () => {
            enqueueSnackbar("Ocorreu um erro", { variant: "error" });
            setIsSaving(false);
          },
        }
      );
    }
  }

  const items = _.filter(edges, function (edge) {
    return !!edge.node;
  });

  let suggestionsTotalCountText = suggestionsTotalCount + " sugestão";
  if (suggestionsTotalCount > 1) {
    suggestionsTotalCountText = suggestionsTotalCount + " sugestões";
  }

  return (
    <div>
      <Typography component="h4" variant="h6" className={classes.title}>
        Que espécie é esta?
      </Typography>
      {suggestionsTotalCount > 0 && (
        <Typography
          component="h5"
          variant="subtitle1"
          className={classes.title}
        >
          {suggestionsTotalCountText}
        </Typography>
      )}

      <List>
        {items.map((edge, i) => {
          const suggestion = edge.node;
          return (
            <React.Fragment key={suggestion.id}>
              {i > 0 && <Divider component="li" />}
              <SuggestionItem
                suggestionID={suggestion}
                occurrence={occurrence}
              />
            </React.Fragment>
          );
        })}
      </List>

      <form onSubmit={onSubmit}>
        <PlantSelectField
          environment={environment}
          onChange={setPlant}
          value={selectedPlant}
          textFieldProps={{
            label: "Sugerir espécie...",
            fullWidth: true,
          }}
        />

        {selectedPlant && (
          <React.Fragment>
            <FormErrors
              filter={{ location: "identity" }}
              classes={{ formError: classes.identityFormError }}
            />

            <TextField
              label="Notas"
              variant="outlined"
              type="text"
              margin="normal"
              fullWidth
              {...notes}
            />

            <FormErrors
              filter={(error) => ["__all__", null].indexOf(error.location) >= 0}
            />

            <ButtonWithProgress
              variant="contained"
              color="primary"
              type="submit"
              isLoading={isSaving}
            >
              Adicionar
            </ButtonWithProgress>
          </React.Fragment>
        )}
      </form>
    </div>
  );
}

const styles = (theme) => ({
  identityFormError: {
    marginTop: theme.spacing(1),
    marginBottom: 0,
  },
});

export default createFragmentContainer(
  withStyles(styles)(hasFormErrors(SuggestionsList)),
  fragmentSpec
);
