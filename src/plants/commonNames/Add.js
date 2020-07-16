import React, { useState } from "react";
import {
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  withStyles,
  useMediaQuery,
} from "@material-ui/core";
import { useSnackbar } from "notistack";
import {
  hasFormErrors,
  FormErrors,
  TextFieldWithError,
} from "../../lib/FormErrors.js";
import { useFormInput } from "../../lib/forms.js";
import ButtonWithProgress from "../../lib/ButtonWithProgress.js";
import PlantAddCommonNameMutation from "./Add.mutation.js";

function CommonNameAdd(props) {
  const { classes, plant, setFormErrors, environment } = props;
  const [isOpen, setOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const fullScreen = useMediaQuery((theme) => theme.breakpoints.down("xs"));

  const nameField = useFormInput("");
  const languageField = useFormInput("por");
  const countryField = useFormInput("bra");

  function handleSubmit(e) {
    e.preventDefault();
    setIsSaving(true);
    PlantAddCommonNameMutation.commit(
      environment,
      {
        lifeNode: plant.id,
        name: nameField.value,
        language: languageField.value,
        country: countryField.value,
      },
      {
        setFormErrors,
        onSuccess: () => {
          enqueueSnackbar("Nome adicionado com sucesso", {
            variant: "success",
          });
          setIsSaving(false);
          setOpen(false);
        },
        onError: () => {
          enqueueSnackbar("Ocorreu um erro", { variant: "error" });
          setIsSaving(false);
        },
      }
    );
  }

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleOpen}>
        Adicionar nome comum
      </Button>
      <Dialog
        keepMounted={false}
        open={isOpen}
        onClose={handleClose}
        scroll="body"
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit,
        }}
        aria-labelledby="CommonNameAdd"
        fullScreen={fullScreen}
      >
        <DialogTitle id="CommonNameAdd">Adicionar Nome Comum</DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <FormErrors filter={{ location: "__all__" }} />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextFieldWithError
                autoFocus
                label="Nome"
                errorFilter={{ location: "name" }}
                required
                fullWidth
                {...nameField}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextFieldWithError
                autoFocus
                label="Idioma"
                errorFilter={{ location: "language" }}
                required
                fullWidth
                {...languageField}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextFieldWithError
                autoFocus
                label="País"
                errorFilter={{ location: "country" }}
                required
                fullWidth
                {...countryField}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Fechar
          </Button>
          <ButtonWithProgress
            type="submit"
            isLoading={isSaving}
            color="primary"
          >
            Adicionar
          </ButtonWithProgress>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

const styles = (theme) => ({});
export default withStyles(styles)(hasFormErrors(CommonNameAdd));
