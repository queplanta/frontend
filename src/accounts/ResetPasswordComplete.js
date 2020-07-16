import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Grid, TextField, withStyles } from "@material-ui/core";
import { useSnackbar } from "notistack";
import { useRouter } from "found";
import { hasFormErrors, FormErrors } from "../lib/FormErrors.js";
import ResetPasswordCompleteMutation from "./ResetPasswordComplete.mutation.js";
import { useFormInput } from "../lib/forms.js";
import PageTitle from "../lib/PageTitle.js";
import ButtonWithProgress from "../lib/ButtonWithProgress.js";
import { Width } from "../ui";

function ResetPasswordComplete({ environment, setFormErrors, classes, match }) {
  const { enqueueSnackbar } = useSnackbar();
  const { router } = useRouter();
  const newPassword1 = useFormInput("");
  const newPassword2 = useFormInput("");

  const [isSaving, setIsSaving] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setIsSaving(true);
    ResetPasswordCompleteMutation.commit(
      environment,
      {
        uidb64: match.params.uidb64,
        token: match.params.token,
        newPassword1: newPassword1.value,
        newPassword2: newPassword2.value,
      },
      {
        setFormErrors,
        onSuccess: () => {
          enqueueSnackbar("Nova senha salva com sucesso", {
            variant: "success",
          });
          setIsSaving(false);
          router.push(`/`);
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
      <Helmet title="Alterar senha" />
      <Grid container spacing={3} component="form" onSubmit={handleSubmit}>
        <Grid item xs={12}>
          <PageTitle>Alterar senha</PageTitle>
          <FormErrors />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Nova senha"
            type="password"
            fullWidth
            required
            {...newPassword1}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Repetir nova senha"
            type="password"
            fullWidth
            required
            {...newPassword2}
          />
        </Grid>
        <Grid item xs={12}>
          <ButtonWithProgress
            type="submit"
            variant="contained"
            color="primary"
            isLoading={isSaving}
          >
            Salvar
          </ButtonWithProgress>
        </Grid>
      </Grid>
    </Width>
  );
}

const styles = (theme) => ({});

export default withStyles(styles)(hasFormErrors(ResetPasswordComplete));
