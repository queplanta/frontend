import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Box, Grid, MenuItem, withStyles } from "@material-ui/core";
import { useSnackbar } from "notistack";
import { Width } from "../ui";
import PageTitle from "../lib/PageTitle.js";
import NotFound from "../pages/NotFound.js";
import {
  hasFormErrors,
  FormErrors,
  TextFieldWithError,
  ChoiceFieldWithError,
} from "../FormErrors.js";
import { useFormInput } from "../lib/forms.js";
import ButtonWithProgress from "../lib/ButtonWithProgress.js";
import PlantEditMutation from "./PlantEdit.mutation.js";
import BreadcrumbsWithHome from "../lib/BreadcrumbsWithHome.js";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";

function Plant(props) {
  const {
    classes,
    plant,
    edibilities,
    ranks,
    flowerTypes,
    flowerColors,
    growthHabits,
    growthRates,
    successions,
    threateneds,
    setFormErrors,
    environment,
  } = props;
  const { enqueueSnackbar } = useSnackbar();

  const titleField = useFormInput(plant.title);
  const descriptionField = useFormInput(plant.description);
  const edibilityField = useFormInput(plant.edibility);
  const rankField = useFormInput(plant.rank);

  const sunLowerField = useFormInput(plant.sun.lower || "");
  const sunUpperField = useFormInput(plant.sun.upper || "");

  const spreadLowerField = useFormInput(plant.spread.lower || "");
  const spreadUpperField = useFormInput(plant.spread.upper || "");

  const heightLowerField = useFormInput(plant.height.lower || "");
  const heightUpperField = useFormInput(plant.height.upper || "");

  const flowerTypeField = useFormInput(plant.flowerTypes || []);
  const flowerColorsField = useFormInput(plant.flowerColors || []);
  const growthHabitField = useFormInput(plant.growthHabit || []);
  const growthRateField = useFormInput(plant.growthRate || []);
  const successionField = useFormInput(plant.succession || "");
  const threatenedField = useFormInput(plant.threatened || "");

  const [isSaving, setIsSaving] = useState(false);

  if (!plant) {
    return <NotFound />;
  }

  function handleSubmit(e) {
    e.preventDefault();
    setIsSaving(true);
    setIsSaving(true);
    PlantEditMutation.commit(
      environment,
      {
        id: plant.id,
        title: titleField.value,
        description: descriptionField.value,
        edibility: edibilityField.value,
        rank: edibilityField.rankField,

        flowerTypes: flowerTypeField.value.length
          ? flowerTypeField.value
          : undefined,
        flowerColors: flowerColorsField.value.length
          ? flowerColorsField.value
          : undefined,
        growthHabit: growthHabitField.value.length
          ? growthHabitField.value
          : undefined,
        growthRate: growthRateField.value.length
          ? growthRateField.value
          : undefined,
        sun: sunLowerField.value
          ? {
              lower: sunLowerField.value,
              upper: sunUpperField.value,
            }
          : undefined,
        spread: spreadLowerField.value
          ? {
              lower: spreadLowerField.value,
              upper: spreadUpperField.value,
            }
          : undefined,
        height: heightLowerField.value
          ? {
              lower: heightLowerField.value,
              upper: heightUpperField.value,
            }
          : undefined,
        threatened: threatenedField.value ? threatenedField.value : undefined,
        succession: successionField.value ? successionField.value : undefined,
      },
      {
        setFormErrors,
        onSuccess: () => {
          enqueueSnackbar("Editada com sucesso", { variant: "success" });
          setIsSaving(false);
        },
        onError: () => {
          enqueueSnackbar("Ocorreu um erro", { variant: "error" });
          setIsSaving(false);
        },
      }
    );
  }

  return (
    <Width>
      <Helmet title={`Editando: ${plant.title}`} />
      <BreadcrumbsWithHome>
        <BreadcrumbsItem to="/plantas">Plantas</BreadcrumbsItem>
        <BreadcrumbsItem to={`/${plant.slug}-p${plant.idInt}/editar`}>
          {`Editando: ${plant.title}`}
        </BreadcrumbsItem>
      </BreadcrumbsWithHome>
      <PageTitle>Editando: {plant.title}</PageTitle>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <TextFieldWithError
              margin="dense"
              label="Titulo"
              errorFilter={{ location: "title" }}
              required
              fullWidth
              {...titleField}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextFieldWithError
              margin="dense"
              label="Descrição"
              errorFilter={{ location: "description" }}
              fullWidth
              multiline
              {...descriptionField}
            />
          </Grid>
          <Grid item xs={6} md={3}>
            <TextFieldWithError
              margin="dense"
              label="Sun lower"
              fullWidth
              errorFilter={{ location: "sun" }}
              {...sunLowerField}
            />
          </Grid>
          <Grid item xs={6} md={3}>
            <TextFieldWithError
              margin="dense"
              label="Sun upper"
              fullWidth
              errorFilter={{ location: "sun" }}
              {...sunUpperField}
            />
          </Grid>
          <Grid item xs={6} md={3}>
            <TextFieldWithError
              margin="dense"
              label="Spread lower"
              fullWidth
              errorFilter={{ location: "spread" }}
              {...spreadLowerField}
            />
          </Grid>
          <Grid item xs={6} md={3}>
            <TextFieldWithError
              margin="dense"
              label="spread upper"
              fullWidth
              errorFilter={{ location: "spread" }}
              {...spreadUpperField}
            />
          </Grid>
          <Grid item xs={6} md={3}>
            <TextFieldWithError
              margin="dense"
              label="height lower"
              fullWidth
              errorFilter={{ location: "height" }}
              {...heightLowerField}
            />
          </Grid>
          <Grid item xs={6} md={3}>
            <TextFieldWithError
              margin="dense"
              label="height upper"
              fullWidth
              errorFilter={{ location: "height" }}
              {...heightUpperField}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextFieldWithError
              margin="dense"
              label="Comestibilidade"
              errorFilter={{ location: "edibility" }}
              fullWidth
              select
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
          </Grid>
          <Grid item xs={12} md={6}>
            <TextFieldWithError
              margin="dense"
              label="Rank"
              errorFilter={{ location: "rank" }}
              fullWidth
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
          </Grid>
          <Grid item xs={12} md={6}>
            <ChoiceFieldWithError
              margin="dense"
              label="Flower Type"
              errorFilter={{ location: "flowerTypes" }}
              fullWidth
              select
              SelectProps={{
                multiple: true,
              }}
              {...flowerTypeField}
              choices={flowerTypes}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <ChoiceFieldWithError
              margin="dense"
              label="Flower Color"
              errorFilter={{ location: "flowerColors" }}
              fullWidth
              select
              SelectProps={{
                multiple: true,
              }}
              {...flowerColorsField}
              choices={flowerColors}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <ChoiceFieldWithError
              margin="dense"
              label="Growth Habit"
              errorFilter={{ location: "growthHabits" }}
              fullWidth
              select
              SelectProps={{
                multiple: true,
              }}
              {...growthHabitField}
              choices={growthHabits}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <ChoiceFieldWithError
              margin="dense"
              label="Succession"
              errorFilter={{ location: "succession" }}
              fullWidth
              select
              {...successionField}
              choices={successions}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <ChoiceFieldWithError
              margin="dense"
              label="Threatened"
              errorFilter={{ location: "threatened" }}
              fullWidth
              select
              {...threatenedField}
              choices={threateneds}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <ChoiceFieldWithError
              margin="dense"
              label="Growth Rate"
              errorFilter={{ location: "growth_rate" }}
              fullWidth
              select
              SelectProps={{
                multiple: true,
              }}
              {...growthRateField}
              choices={growthRates}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <FormErrors
              filter={(error) => ["__all__", null].indexOf(error.location) >= 0}
            />
            <ButtonWithProgress
              variant="outlined"
              className={classes.button}
              type="submit"
              isLoading={isSaving}
            >
              salvar alteração
            </ButtonWithProgress>
          </Grid>
        </Grid>
      </form>
    </Width>
  );
}

const styles = (theme) => ({
  button: {
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
});
export default withStyles(styles)(hasFormErrors(Plant));
