import React, { useState } from 'react';
import {
  Card, CardContent, CardHeader, CardActions, TextField, Button,
  IconButton,
  withStyles
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
// import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import _ from 'lodash';
import { hasFormErrors, FormErrors } from '../../FormErrors.js';
import ImgWithLocation from '../../lib/ImgWithLocation.js';
import { useFormInput, clearFormInput } from '../../lib/forms.js';
import ButtonWithProgress from '../../lib/ButtonWithProgress.js';
import AddIdentifyMutation from './AddIdentify.mutation.js';

function AddIdentify({classes, environment, setFormErrors}) {
  const when = useFormInput('')
  const where = useFormInput('')
  const notes = useFormInput('')
  const [images, setImages] = useState([])
  const [isSaving, setIsSaving] = useState(false)

  function onChange(e) {
    for ( var i = 0 ; i < e.target.files.length ; i++) {
      const file = e.target.files[i];
      const fileReader = new FileReader();
      fileReader.onload = (ee) => {
        const location = null
        setImages(prevImages => ([...prevImages, {file: file, imagePreviewUrl: fileReader.result, location}]))
      }
      fileReader.readAsDataURL(file);
    }
  }

  function removeImage(index) {
    setImages(prevImages => {
      prevImages.splice(index, 1)
      return [...prevImages]
    })
  }

  function onSuccess() {
    clearFormInput(when)
    clearFormInput(where)
    clearFormInput(notes)
    setImages([])
    setIsSaving(false)
  }

  function handleSubmit(e) {
    e.preventDefault()
    const formData = new FormData()
    images.forEach(image => {
      formData.append('images', image.file)
    })
    setIsSaving(true)
    AddIdentifyMutation.commit(
			environment,
			{
				when: when.value,
				where: where.value,
				notes: notes.value,
			},
      formData,
			{
				setFormErrors,
        onSuccess,
        onError: () => {
          setIsSaving(false)
        }
			}
		)
  }
    
  return <Card elevation={1} component="form" onSubmit={handleSubmit}>
    <CardHeader title="Adicionar pedido de identificação" />
    <CardContent>
      <FormErrors filter={(error) => ["__all__", null].indexOf(error.location) >= 0} />

      <div className={classes.imgsList}>
        {images.map((image, i) => {
          return <span key={i} className={classes.img}>
            <ImgWithLocation src={image.imagePreviewUrl} onLocation={(location) => {
              const updatedImages = _.set(images, [i, 'location'], location);
              setImages(updatedImages)
            }} />
            <IconButton aria-label="delete" color="secondary" className={classes.imgDelete} onClick={() => removeImage(i)}>
              <DeleteIcon />
            </IconButton>
          </span>
        })}
      </div>

      <Button component="label" htmlFor="photosInput"><AddPhotoAlternateIcon className={classes.buttonIcon} /> Adicionar Foto</Button>
      {/*<Button><PhotoCameraIcon className={classes.buttonIcon} /> Tirar Foto</Button>*/}

      <input id="photosInput" type="file" multiple accept="image/*" onChange={onChange} style={{display: 'none'}} />

      <TextField
        label="Quando?"
        placeholder="agora, hoje, ontem, 21/06/2010..."
        type="text"
        margin="normal"
        variant="outlined"
        fullWidth
        {...when}
      />

      <TextField
        label="Onde?"
        type="text"
        margin="normal"
        variant="outlined"
        fullWidth
        {...where}
      />

      <TextField
        label="Informações adicinais"
        placeholder="O que mais você pode dizer sobre essa planta?"
        type="text"
        margin="normal"
        variant="outlined"
        fullWidth
        multiline
        {...notes}
      />

      <ButtonWithProgress type="submit" variant="contained" color="primary" className={classes.submitButton} isLoading={isSaving}>enviar</ButtonWithProgress>
    </CardContent>
  </Card>
}

const styles = (theme) => ({
  imgsList: {
    marginBottom: theme.spacing(1),
  },
  img: {
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
    display: 'inline-block',
    position: 'relative',
    height: 100,
    '& img': {
      border: '1px solid #ccc',
      borderRadius: '4px',
      objectFit: 'cover',
      height: 100,
    }
  },
  imgDelete: {
    position: 'absolute',
    top: -12,
    right: -12,
  },
  submitButton: {
    marginTop: theme.spacing(1),
  },
  buttonIcon: {
    marginRight: theme.spacing(1),
  },
})

// export default createFragmentContainer(
export default withStyles(styles)(hasFormErrors(AddIdentify))
//   query
// )
