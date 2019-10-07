import React, { useState } from 'react';
import { Button, Dialog, DialogContent, DialogActions, TextField, withStyles } from '@material-ui/core';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import _ from 'lodash';
import { useSnackbar } from 'notistack';
import ButtonWithProgress from '../lib/ButtonWithProgress.js';
import { useFormInput } from '../lib/forms.js';
import { hasFormErrors, FormErrors } from '../FormErrors.js';
import ImgWithLocation from '../lib/ImgWithLocation.js';
// import clsx from 'clsx';
// import { createRefetchContainer } from 'react-relay';
// import { fragmentSpec, refetchQuery } from './AddImage.query.js';
import AddImageMutation from './AddImage.mutation.js';

function AddImage(props) {
  const {environment, classes, parentId, setFormErrors, onSuccess, imaging} = props;

  const { enqueueSnackbar } = useSnackbar();

  const [isOpen, setOpen] = useState(false);
  const [isSaving, setSaving] = useState(false);
  const description = useFormInput()
  const [image, setImage] = useState(null)
  // const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  function handleOpen() {
    setOpen(true)
  }

  function handleClose() {
    setOpen(false)
  }

  function handleAdd() {
    if(!image) {
      return false;
    }
    setSaving(true)
    const formData = new FormData()
    formData.append('image', image.file)
    AddImageMutation.commit(
      environment,
      {
        parent: parentId,
        imagingId: imaging.id,
        description: description.value,
      },
      formData,
      {
        setFormErrors,
        onSuccess: (response) => {
          enqueueSnackbar('Criada com sucesso', {variant: "success"})
          setSaving(false)
          handleClose()
          if (typeof onSuccess === 'function') {
            onSuccess(response)
          }
        },
        onError: () => {
          enqueueSnackbar('Ocorreu um erro', {variant: "error"})
          setSaving(false)
        }
      }
    )
  }

  function onSetImage(e) {
    for ( var i = 0 ; i < e.target.files.length ; i++) {
      const file = e.target.files[i];
      const fileReader = new FileReader();
      fileReader.onload = (ee) => {
        const location = null
        setImage({file: file, imagePreviewUrl: fileReader.result, location});
      }
      fileReader.readAsDataURL(file);
    }
  }

  return <React.Fragment>
    <Button variant="contained" onClick={handleOpen}>Adicionar Imagem</Button>
    <Dialog
      keepMounted={false}
      open={isOpen}
      onClose={handleClose}
      maxWidth="xl"
      scroll="body"
    >
      <DialogContent className={classes.dialogContent}>
        <FormErrors filter={(error) => ["__all__", null].indexOf(error.location) >= 0} />
        {image && <span className={classes.img}>
          <ImgWithLocation src={image.imagePreviewUrl} onLocation={(location) => {
            const updatedImage = _.set(image, 'location', location);
            setImage(updatedImage);
          }} />
        </span>}
        <Button variant="outlined" component="label" htmlFor="imagesInput"><AddPhotoAlternateIcon className={classes.buttonIcon} /> Adicionar Imagem</Button>
        <input id="imagesInput" type="file" accept="image/*" onChange={onSetImage} style={{display: 'none'}} />
        <TextField
          label="Descrição"
          fullWidth
          multiline
          className={classes.descriptionField}
          {...description}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Fechar
        </Button>
        <ButtonWithProgress isLoading={isSaving} variant="contained" color="primary" onClick={handleAdd}>Adicionar</ButtonWithProgress>
      </DialogActions>
    </Dialog>
  </React.Fragment>;
}

const styles = (theme) => ({
  img: {
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
    display: 'block',
    position: 'relative',
    height: 100,
    '& img': {
      border: '1px solid #ccc',
      borderRadius: '4px',
      objectFit: 'cover',
      height: 100,
    }
  },
  descriptionField: {
    marginTop: theme.spacing(2),
  },
  dialogContent: {
    paddingTop: theme.spacing(3),
  }
})
export default withStyles(styles)(hasFormErrors(AddImage));
