import React, { useState } from 'react';
import {
  TextField, Button, IconButton, Paper, FormLabel,
  withStyles
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import _ from 'lodash';
import { useSnackbar } from 'notistack';
import { hasFormErrors, FormErrors } from '../FormErrors.js';
import ImgWithLocation from '../lib/ImgWithLocation.js';
import { useFormInput } from '../lib/forms.js';
import ButtonWithProgress from '../lib/ButtonWithProgress.js';
import OccurrenceAddMutation from './OccurrenceAdd.mutation.js';
import { Width } from '../ui';
import PageTitle from '../lib/PageTitle.js';
import { MapGeolocated, Marker, defaultPosition } from './Map.js';
import PlantSelectField from '../plants/PlantSelectField.js';

function OccurrenceAdd({classes, environment, setFormErrors, viewer}) {
  const { enqueueSnackbar } = useSnackbar()
  const [lifeNode, setLifeNode] = useState(null)
  const when = useFormInput('')
  const notes = useFormInput('')
  const [images, setImages] = useState([])
  const [isSaving, setIsSaving] = useState(false)
  const [markerPosition, setMarkerPosition] = useState(defaultPosition)

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

  function onPositionChange(position) {
    setMarkerPosition([position[0], position[1]])
  }

  function onMoveMarker(e) {
    const position = [e.latlng.lat, e.latlng.lng]
    const isEqual = markerPosition[0] === position[0] && markerPosition[1] === position[1]
    if (!isEqual) {
      setMarkerPosition(position)
    }
  }

  function onSuccess() {
    setIsSaving(false)
    enqueueSnackbar('Ocorrência adicionada com sucesso', {variant: "success"})
  }

  function handleSubmit(e) {
    e.preventDefault()
    const formData = new FormData()
    images.forEach(image => {
      formData.append('images', image.file)
    })
    setIsSaving(true)
    OccurrenceAddMutation.commit(
			environment,
			{
        location: {
          "type": "Point",
          "coordinates": markerPosition
        },
        lifeId: lifeNode.id,
				when: when.value,
				notes: notes.value,
			},
      formData,
			{
				setFormErrors,
        onSuccess,
        onError: () => {
          enqueueSnackbar('Ocorreu um erro', {variant: "error"})
          setIsSaving(false)
        }
			}
		)
  }
    
  return <Width component="div">
    <PageTitle>Adicionar Ocorrência</PageTitle>
    <Paper className={classes.paper}>
      <form onSubmit={handleSubmit}>
        <PlantSelectField viewer={viewer} onChange={setLifeNode} />

        <div className={classes.where}>
          <FormLabel>Onde?</FormLabel>
          <MapGeolocated className={classes.map} onPositionChange={onPositionChange}>
            <Marker position={markerPosition} draggable={true} onMove={onMoveMarker} />
          </MapGeolocated>
        </div>

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
          label="Informações adicinais"
          placeholder="O que mais você pode dizer sobre essa planta?"
          type="text"
          margin="normal"
          variant="outlined"
          fullWidth
          multiline
          {...notes}
        />

        <FormErrors filter={(error) => ["__all__", null].indexOf(error.location) >= 0} />

        <ButtonWithProgress type="submit" variant="contained" color="primary" className={classes.submitButton} isLoading={isSaving}>enviar</ButtonWithProgress>
      </form>
    </Paper>
  </Width>
}

const styles = (theme) => ({
  paper: {
    padding: theme.spacing(2),
  },
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
  map: {
    height: 500,
  },
  where: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
})

export default withStyles(styles)(hasFormErrors(OccurrenceAdd))
