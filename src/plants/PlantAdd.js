import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Grid, withStyles } from "@material-ui/core";
import { useRouter } from "found";
import { useSnackbar } from "notistack";
import { Width } from "../ui";
import PageTitle from "../lib/PageTitle.js";
import {
  hasFormErrors,
  FormErrors,
  TextFieldWithError,
  ChoiceFieldWithError,
} from "../FormErrors.js";
import { useFormInput } from "../lib/forms.js";
import ButtonWithProgress from "../lib/ButtonWithProgress.js";
import PlantSelectField from "./PlantSelectField.js";
import PlantAddMutation from "./PlantAdd.mutation.js";
import BreadcrumbsWithHome from "../lib/BreadcrumbsWithHome.js";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";

function PlantAdd(props) {
  const {
    classes,
    edibilities,
    ranks,
    flowertypes,
    flowercolors,
    growthhabits,
    setFormErrors,
    environment,
  } = props;
  const { router } = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [lifeNode, setLifeNode] = useState(null);
  const titleField = useFormInput("");
  const descriptionField = useFormInput("");
  const edibilityField = useFormInput("");
  const rankField = useFormInput("");

  const heightField = useFormInput("");
  const spreadField = useFormInput("");
  const sunField = useFormInput("");
  const flowerTypeField = useFormInput("");
  const flowerColorField = useFormInput("");
  const growthHabitField = useFormInput("");

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
        // height: heightField.value,
        // spread: spreadField.value,
        // sun: sunField.value,
        flower_types: flowerTypeField.value,
        flower_colors: flowerColorField.value,
        growth_habit: growthHabitField.value,
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
      <BreadcrumbsWithHome>
        <BreadcrumbsItem to="/plantas">Plantas</BreadcrumbsItem>
        <BreadcrumbsItem to="/plantas/adicionar">
          Adicionar Planta
        </BreadcrumbsItem>
      </BreadcrumbsWithHome>
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
              required
              fullWidth
              multiline
              {...descriptionField}
            />
            <ChoiceFieldWithError
              margin="dense"
              label="Comestibilidade"
              errorFilter={{ location: "edibility" }}
              required
              fullWidth
              select
              {...edibilityField}
              choices={edibilities}
            />
            <ChoiceFieldWithError
              margin="dense"
              label="Rank"
              errorFilter={{ location: "rank" }}
              required
              fullWidth
              select
              {...rankField}
              choices={"ranks"}
            />
            <TextFieldWithError
              margin="dense"
              label="Altura"
              errorFilter={{ location: "height" }}
              fullWidth
              {...heightField}
            />
            <TextFieldWithError
              margin="dense"
              label="Spread"
              errorFilter={{ location: "spread" }}
              fullWidth
              {...spreadField}
            />
            <TextFieldWithError
              margin="dense"
              label="Sol"
              errorFilter={{ location: "sun" }}
              fullWidth
              {...sunField}
            />
            <ChoiceFieldWithError
              margin="dense"
              label="Flower Type"
              errorFilter={{ location: "flower_types" }}
              fullWidth
              select
              {...flowerTypeField}
              choices={flowertypes}
            />
            <ChoiceFieldWithError
              margin="dense"
              label="Flower Color"
              errorFilter={{ location: "flower_colors" }}
              fullWidth
              select
              {...flowerColorField}
              choices={flowercolors}
            />
            <ChoiceFieldWithError
              margin="dense"
              label="Growth Habit"
              errorFilter={{ location: "growth_habit" }}
              fullWidth
              select
              {...growthHabitField}
              choices={growthhabits}
            />
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
