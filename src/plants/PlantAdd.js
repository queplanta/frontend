import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Grid, InputAdornment, MenuItem, withStyles } from "@material-ui/core";
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
    flowerTypes,
    flowerColors,
    growthHabits,
    growthRates,
    successions,
    threateneds,
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

  const sunLowerField = useFormInput("");
  const sunUpperField = useFormInput("");

  const spreadLowerField = useFormInput("");
  const spreadUpperField = useFormInput("");

  const heightLowerField = useFormInput("");
  const heightUpperField = useFormInput("");

  const flowerTypeField = useFormInput([]);
  const flowerColorsField = useFormInput([]);
  const growthHabitField = useFormInput([]);
  const growthRateField = useFormInput([]);
  const successionField = useFormInput("");
  const threatenedField = useFormInput("");

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
        description: descriptionField.value
          ? descriptionField.value
          : undefined,
        edibility: edibilityField.value ? edibilityField.value : undefined,
        rank: rankField.value ? rankField.value : undefined,

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
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <PlantSelectField
              environment={environment}
              onChange={setLifeNode}
              value={lifeNode}
            />
          </Grid>
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
              label="Sol mínimo"
              fullWidth
              InputProps={{
                endAdornment: <InputAdornment position="end">%</InputAdornment>,
              }}
              errorFilter={{ location: "sun" }}
              {...sunLowerField}
            />
          </Grid>
          <Grid item xs={6} md={3}>
            <TextFieldWithError
              margin="dense"
              label="Sol máximo"
              fullWidth
              InputProps={{
                endAdornment: <InputAdornment position="end">%</InputAdornment>,
              }}
              errorFilter={{ location: "sun" }}
              {...sunUpperField}
            />
          </Grid>
          <Grid item xs={6} md={3}>
            <TextFieldWithError
              margin="dense"
              label="Raio de copa mínima"
              fullWidth
              InputProps={{
                endAdornment: <InputAdornment position="end">m</InputAdornment>,
              }}
              errorFilter={{ location: "spread" }}
              {...spreadLowerField}
            />
          </Grid>
          <Grid item xs={6} md={3}>
            <TextFieldWithError
              margin="dense"
              label="Raio de copa máxima"
              fullWidth
              InputProps={{
                endAdornment: <InputAdornment position="end">m</InputAdornment>,
              }}
              errorFilter={{ location: "spread" }}
              {...spreadUpperField}
            />
          </Grid>
          <Grid item xs={6} md={3}>
            <TextFieldWithError
              margin="dense"
              label="Altura mínima"
              fullWidth
              InputProps={{
                endAdornment: <InputAdornment position="end">m</InputAdornment>,
              }}
              errorFilter={{ location: "height" }}
              {...heightLowerField}
            />
          </Grid>
          <Grid item xs={6} md={3}>
            <TextFieldWithError
              margin="dense"
              label="Altura máxima"
              fullWidth
              InputProps={{
                endAdornment: <InputAdornment position="end">m</InputAdornment>,
              }}
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
              required
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
              label="Tipo da flor"
              errorFilter={{ location: "flowerTypes" }}
              {...flowerTypeField}
              choices={flowerTypes}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <ChoiceFieldWithError
              label="Cor da flor"
              errorFilter={{ location: "flowerColors" }}
              {...flowerColorsField}
              choices={flowerColors}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <ChoiceFieldWithError
              label="Hábito de crescimento"
              errorFilter={{ location: "growthHabits" }}
              {...growthHabitField}
              choices={growthHabits}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <ChoiceFieldWithError
              label="Taxa de crescimento"
              errorFilter={{ location: "growth_rate" }}
              {...growthRateField}
              choices={growthRates}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextFieldWithError
              margin="dense"
              label="Sucessão"
              errorFilter={{ location: "succession" }}
              fullWidth
              select
              {...successionField}
            >
              {successions.enumValues.map((e, i) => {
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
              label="Ameaçada de exintação?"
              errorFilter={{ location: "threatened" }}
              fullWidth
              select
              {...threatenedField}
            >
              {threateneds.enumValues.map((e, i) => {
                return (
                  <MenuItem key={i} value={e.name}>
                    {e.description}
                  </MenuItem>
                );
              })}
            </TextFieldWithError>
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
export default withStyles(styles)(hasFormErrors(PlantAdd));
