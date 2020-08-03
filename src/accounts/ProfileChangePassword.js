import React, { useState, useContext, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Grid, TextField, Hidden, withStyles } from "@material-ui/core";
import { useSnackbar } from "notistack";
import NotFound from "../pages/NotFound.js";
import { hasFormErrors, FormErrors } from "../lib/FormErrors.js";
import ProfileChangePasswordMutation from "./ProfileChangePassword.mutation.js";
import { useFormInput } from "../lib/forms.js";
import Link from "../lib/Link.js";
import PageTitle from "../lib/PageTitle.js";
import ButtonWithProgress from "../lib/ButtonWithProgress.js";
import SingleHeader from "../lib/SingleHeader.js";
import { ToolbarHeaderContext } from "../ToolbarHeaderContext.js";

function ProfileChangePassword({ environment, setFormErrors, me, classes }) {
  const { enqueueSnackbar } = useSnackbar();
  const old_password = useFormInput();
  const new_password1 = useFormInput();
  const new_password2 = useFormInput();
  const [isSaving, setIsSaving] = useState(false);

  const toolbarContext = useContext(ToolbarHeaderContext);
  useEffect(() => {
    toolbarContext.setToolbarHeader(<SingleHeader>Alterar senha</SingleHeader>);
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    setIsSaving(true);
    ProfileChangePasswordMutation.commit(
      environment,
      {
        oldPassword: old_password.value,
        newPassword1: new_password1.value,
        newPassword2: new_password2.value,
      },
      {
        setFormErrors,
        onSuccess: () => {
          enqueueSnackbar("Nova senha salva com sucesso", {
            variant: "success",
          });
          setIsSaving(false);
        },
        onError: () => {
          enqueueSnackbar("Ocorreu um erro", { variant: "error" });
          setIsSaving(false);
        },
      }
    );
  }

  if (!me) {
    return <NotFound />;
  }

  return (
    <React.Fragment>
      <Helmet title="Alterar senha" />
      <Grid container spacing={3} component="form" onSubmit={handleSubmit}>
        <Grid item xs={12}>
          <PageTitle>Alterar senha</PageTitle>
          <FormErrors />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Senha antiga"
            type="password"
            fullWidth
            required
            {...old_password}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Nova senha"
            type="password"
            fullWidth
            required
            {...new_password1}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Repetir nova senha"
            type="password"
            fullWidth
            required
            {...new_password2}
          />
        </Grid>
        <Grid item xs={12}>
          <ButtonWithProgress
            className={classes.fl}
            type="submit"
            variant="contained"
            color="primary"
            isLoading={isSaving}
          >
            Salvar
          </ButtonWithProgress>
          <Hidden className={classes.fl} mdUp implementation="css">
            <Link className={classes.link} to={`/u/${me.username}`}>
              Voltar para meu perfil
            </Link>
          </Hidden>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

const styles = (theme) => ({
  fl: {
    float: "left",
  },
  link: {
    fontSize: 12,
    marginLeft: theme.spacing(2),
  },
});

export default withStyles(styles)(hasFormErrors(ProfileChangePassword));
