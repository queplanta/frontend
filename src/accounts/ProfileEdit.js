import React, { useState } from 'react';
import Helmet from 'react-helmet';
import { Grid, TextField, Hidden, withStyles } from '@material-ui/core';
import Link from '../lib/Link.js';
import { useSnackbar } from 'notistack';
import NotFound from '../pages/NotFound.js'
import { hasFormErrors, FormErrors } from '../FormErrors.js';
import ProfileEditMutation from './ProfileEdit.mutation.js';
import { useFormInput } from '../lib/forms.js';
import PageTitle from '../lib/PageTitle.js';
import ButtonWithProgress from '../lib/ButtonWithProgress.js';

function ProfileEdit({environment, setFormErrors, me, classes}) {
  if (!me) {
    return <NotFound />
  }
  const { enqueueSnackbar } = useSnackbar();
  const username = useFormInput(me.username)
  const firstName = useFormInput(me.firstName)
  const email = useFormInput(me.email)

  const [isSaving, setIsSaving] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    setIsSaving(true)
    ProfileEditMutation.commit(
      environment,
      {
        firstName: firstName.value,
        username: username.value,        
        email: email.value,
      },
      {
        setFormErrors,
        onSuccess: () => {
          enqueueSnackbar('Perfil editado com sucesso', {variant: "success"})
          setIsSaving(false)
        },
        onError: () => {
          enqueueSnackbar('Ocorreu um erro', {variant: "error"})
          setIsSaving(false)
        }
      }
    )
  }

  return <React.Fragment>
    <Helmet
      title="Editar perfil"
    />
    <Grid container spacing={3} component="form" onSubmit={handleSubmit}>
      <Grid item xs={12}>
        <PageTitle>Editar Perfil</PageTitle>
        <FormErrors />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Nome"
          fullWidth
          required
          {...firstName}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Nome de usuário"
          fullWidth
          required
          {...username}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="E-mail"
          fullWidth
          required
          {...email}
        />
      </Grid>
      <Grid item xs={12}>
        <ButtonWithProgress className={classes.fl} type="submit" variant="contained" color="primary" isLoading={isSaving}>Salvar</ButtonWithProgress>
        <Hidden className={classes.fl} mdUp implementation="css">
          <Link className={classes.link} to={`/u/${me.username}`}>Voltar para meu perfil</Link>
        </Hidden>
      </Grid>
    </Grid>
  </React.Fragment>
}

const styles = (theme) => ({
  fl: {
    float: 'left'
  },
  link: {
    fontSize: 12,
    marginLeft: theme.spacing(2),
  },
});

export default withStyles(styles)(hasFormErrors(ProfileEdit))
