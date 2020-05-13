import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Grid, MenuItem, withStyles } from "@material-ui/core";
import { useRouter } from "found";
import { useSnackbar } from "notistack";
import { Width } from "../ui";
import PageTitle from "../lib/PageTitle.js";
import {
  hasFormErrors,
  FormErrors,
  TextFieldWithError,
} from "../FormErrors.js";
import { useFormInput } from "../lib/forms.js";
import ButtonWithProgress from "../lib/ButtonWithProgress.js";
import PlantSelectField from "./PlantSelectField.js";
import PlantAddMutation from "./PlantAdd.mutation.js";

function PlantAdd(props) {
  const { classes, edibilities, ranks, setFormErrors, environment } = props;
  const { router } = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [lifeNode, setLifeNode] = useState(null);
  const titleField = useFormInput("");
  const descriptionField = useFormInput("");
  const edibilityField = useFormInput("");
  const rankField = useFormInput("");

  const [isSaving, setIsSaving] = useState(false);

  function onSuccess(response) {
    setIsSaving(false);
    enqueueSnackbar("Adicionada com sucesso", { variant: "success" });
    router.push(
      `/${response.lifeNodeCreate.lifeNode.slug}-p${response.lifeNodeCreate.lifeNode.idInt}`
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    setIsSaving(true);
    PlantAddMutation.commit(
      environment,
      {
        parent: lifeNode ? lifeNode.id : null,
        title: titleField.value,
        description: descriptionField.value,
        edibility: edibilityField.value,
        rank: rankField.value,
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

  return (
    <Width>
      <Helmet title={`Adicionar Planta`} />
      <PageTitle>Adicionar Planta</PageTitle>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <form onSubmit={handleSubmit}>
            <PlantSelectField
              environment={environment}
              onChange={setLifeNode}
              value={lifeNode}
            />
            <TextFieldWithError
              margin="dense"
              label="Titulo"
              errorFilter={{ location: "title" }}
              required
              fullWidth
              {...titleField}
            />

            <TextFieldWithError
              margin="dense"
              label="Descrição"
              errorFilter={{ location: "description" }}
              fullWidth
              required
              multiline
              {...descriptionField}
            />

            <TextFieldWithError
              margin="dense"
              label="Comestibilidade"
              errorFilter={{ location: "edibility" }}
              fullWidth
              select
              required
              {...edibilityField}
            >
              {edibilities.enumValues.map((e, i) => {
                return (
                  <MenuItem key={i} value={e.name}>
                    {e.description}
                  </MenuItem>
                );
              })}
            </TextFieldWithError>

            <TextFieldWithError
              margin="dense"
              label="Rank"
              errorFilter={{ location: "rank" }}
              fullWidth
              required
              select
              {...rankField}
            >
              {ranks.enumValues.map((e, i) => {
                return (
                  <MenuItem key={i} value={e.name}>
                    {e.description}
                  </MenuItem>
                );
              })}
            </TextFieldWithError>

            <FormErrors
              filter={(error) => ["__all__", null].indexOf(error.location) >= 0}
            />

            <ButtonWithProgress
              variant="outlined"
              className={classes.button}
              type="submit"
              isLoading={isSaving}
            >
              salvar
            </ButtonWithProgress>
          </form>
        </Grid>
      </Grid>
    </Width>
  );
}

const styles = (theme) => ({
  button: {
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
});
export default withStyles(styles)(hasFormErrors(PlantAdd));
