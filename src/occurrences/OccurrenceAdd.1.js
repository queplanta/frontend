import React, { useState } from "react";
import {
  Button,
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Typography,
  withStyles,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import ImgWithLocation, { getImageLocation } from "../lib/ImgWithLocation.js";
import { Map, Marker } from "./Map.js";

function OccurrenceAddStepOne({
  classes,
  setStep,
  images,
  setImages,
  setMarkerPosition,
  fullScreen,
}) {
  const [imgPosition, setImgPosition] = useState(null);
  const [askImgPosition, setAskImgPosition] = useState(false);
  const fileRef = React.useRef();

  React.useEffect(() => {
    if (images.length === 0) {
      fileRef.current.click();
    }
  }, [images.length]);

  function onChange(e) {
    for (var i = 0; i < e.target.files.length; i++) {
      const file = e.target.files[i];
      const fileReader = new FileReader();
      fileReader.onload = (ee) => {
        let location = null;
        getImageLocation(ee.target.result).then((output) => {
          location = output;
          if (location) {
            setImgPosition({ lat: location.latitude, lng: location.longitude });
            setAskImgPosition(true);
          }
        });
        setImages((prevImages) => [
          ...prevImages,
          { file: file, imagePreviewUrl: fileReader.result, location },
        ]);
      };
      fileReader.readAsDataURL(file);
    }
  }

  function removeImage(index) {
    setImages((prevImages) => {
      prevImages.splice(index, 1);
      return [...prevImages];
    });
  }

  function onHandleCloseAskImgPosition() {
    setAskImgPosition(false);
  }

  function useImgPosition() {
    setAskImgPosition(false);
    setMarkerPosition([imgPosition.lat, imgPosition.lng]);
  }

  return (
    <div className={classes.container}>
      <div className={classes.imgsList}>
        {images.map((image, i) => {
          return (
            <span key={i} className={classes.img}>
              <ImgWithLocation src={image.imagePreviewUrl} />
              <IconButton
                aria-label="delete"
                color="secondary"
                className={classes.imgDelete}
                onClick={() => removeImage(i)}
              >
                <DeleteIcon />
              </IconButton>
            </span>
          );
        })}
        {askImgPosition && imgPosition && (
          <Dialog
            keepMounted={false}
            open={askImgPosition}
            onClose={onHandleCloseAskImgPosition}
            maxWidth="xl"
            scroll="body"
          >
            <DialogTitle className={classes.askImgPositionDialogTitle}>
              Sua foto contem uma localização. Gostaria de usa-la no mapa?
            </DialogTitle>
            <DialogContent>
              <Typography gutterBottom>
                Você poderá corrigir a localização depois de aceitar.
              </Typography>
              <Map
                center={imgPosition}
                className={classes.mapPreview}
                zoom={18}
              >
                <Marker position={imgPosition} />
              </Map>
              <p>
                Essa localização está gravada junto a sua foto através do{" "}
                <a
                  href="https://pt.wikipedia.org/wiki/Exchangeable_image_file_format"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Exif
                </a>
              </p>
            </DialogContent>
            <DialogActions>
              <Button variant="contained" onClick={onHandleCloseAskImgPosition}>
                Não
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={useImgPosition}
              >
                Sim
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </div>

      <Button
        component="label"
        htmlFor="photosInput"
        variant="outlined"
        color="secondary"
        fullWidth={fullScreen}
        className={classes.addPhotosButton}
      >
        <AddPhotoAlternateIcon className={classes.buttonIcon} /> Adicionar Fotos
      </Button>

      <input
        id="photosInput"
        type="file"
        multiple
        accept="image/*"
        onChange={onChange}
        style={{ display: "none" }}
        ref={fileRef}
      />
    </div>
  );
}

const styles = (theme) => ({
  container: {
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(3),
    },
  },
  imgsList: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  img: {
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
    display: "inline-block",
    position: "relative",
    height: 100,
    "& img": {
      border: "1px solid #ccc",
      borderRadius: "4px",
      objectFit: "cover",
      height: 100,
    },
  },
  imgDelete: {
    position: "absolute",
    top: -12,
    right: -12,
  },
  addPhotosButton: {},
  buttonIcon: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
  mapPreview: {
    height: 150,
  },
  askImgPositionDialogTitle: {
    paddingBottom: 0,
  },
});

export default withStyles(styles)(OccurrenceAddStepOne);
