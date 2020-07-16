import React, { useState } from "react";
import { Grid, Button, Hidden, withStyles } from "@material-ui/core";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import { useSnackbar } from "notistack";
import NotFound from "../pages/NotFound.js";
import { hasFormErrors, FormErrors } from "../lib/FormErrors.js";
import ProfileChangeAvatarMutation from "./ProfileChangeAvatar.mutation.js";
import ButtonWithProgress from "../lib/ButtonWithProgress.js";
import PageTitle from "../lib/PageTitle.js";
import Link from "../lib/Link.js";

function ProfileChangeAvatar(props) {
  const { environment, setFormErrors, me, classes } = props;

  const { enqueueSnackbar } = useSnackbar();
  const [image, setImage] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setIsSaving(true);
    const formData = new FormData();
    formData.append("avatar", image.file);
    ProfileChangeAvatarMutation.commit(environment, {}, formData, {
      setFormErrors,
      onSuccess: () => {
        enqueueSnackbar("Imagem de exibição alterada com sucesso", {
          variant: "success",
        });
        setIsSaving(false);
      },
      onError: () => {
        enqueueSnackbar("Ocorreu um erro", { variant: "error" });
        setIsSaving(false);
      },
    });
  }

  function onSetImage(e) {
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.onload = (ee) => {
      setImage({ file: file, imagePreviewUrl: fileReader.result });
    };
    fileReader.readAsDataURL(file);
  }

  if (!me) {
    return <NotFound />;
  }

  return (
    <React.Fragment>
      <Grid container spacing={3} component="form" onSubmit={handleSubmit}>
        <Grid item xs={12}>
          <PageTitle>Alterar imagem de exibição</PageTitle>
          <FormErrors />
        </Grid>
        <Grid item xs={12}>
          <span className={classes.img}>
            <img src={image ? image.imagePreviewUrl : me.avatar.url} alt={``} />
          </span>
          <Button
            size="small"
            variant="outlined"
            component="label"
            htmlFor="imagesInput"
          >
            <AddPhotoAlternateIcon className={classes.buttonIcon} /> Alterar
            imagem de exibição
          </Button>
          <input
            id="imagesInput"
            type="file"
            accept="image/*"
            onChange={onSetImage}
            style={{ display: "none" }}
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
  img: {
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
    display: "block",
    position: "relative",
    height: 100,
    "& img": {
      border: "1px solid #ccc",
      borderRadius: "4px",
      objectFit: "cover",
      height: 100,
    },
  },
});

export default withStyles(styles)(hasFormErrors(ProfileChangeAvatar));
