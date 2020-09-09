import React from "react";
import { Typography, Button, withStyles } from "@material-ui/core";
import { defaultPosition, MapGeolocated, Marker } from "./Map.js";

function OccurrenceAddStepTwo({
  classes,
  markerPosition,
  setMarkerPosition,
  askImgPosition,
  setStep,
  images,
}) {
  const [addLocation, setAddLocation] = React.useState(
    markerPosition !== defaultPosition || images.length === 0
  );

  function onPositionChange(position) {
    setMarkerPosition([position[0], position[1]]);
  }

  function onMoveMarker(e) {
    const { lat, lng } = e.target._latlng;
    const position = [lat, lng];
    const isEqual =
      markerPosition[0] === position[0] && markerPosition[1] === position[1];
    if (!isEqual) {
      setMarkerPosition(position);
    }
  }

  return (
    <React.Fragment>
      {!addLocation && (
        <div className={classes.container}>
          <Typography variant="body2" gutterBottom>
            Gostaria de marcar a <strong>localização</strong> desta{" "}
            <strong>planta</strong> no <strong>mapa</strong>?
          </Typography>
          <Button
            color="primary"
            variant="contained"
            onClick={() => setAddLocation(true)}
          >
            Sim
          </Button>
          {` `}
          <Button
            color="secondary"
            variant="contained"
            onClick={() => setStep(2)}
          >
            Não
          </Button>
        </div>
      )}
      {addLocation && (
        <div className={classes.where}>
          <MapGeolocated
            className={classes.map}
            onPositionChange={onPositionChange}
            center={markerPosition}
            scrollWheelZoom={false}
          >
            <Marker
              position={markerPosition}
              draggable={true}
              onMoveend={onMoveMarker}
            />
          </MapGeolocated>
        </div>
      )}
    </React.Fragment>
  );
}

const styles = (theme) => ({
  map: {
    height: "calc(100vh - 180px)",
    [theme.breakpoints.down("sm")]: {
      height: "calc(100vh - 104px)",
      marginTop: "-16px",
    },
  },
  where: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  container: {
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(3, 3, 2, 3),
    },
  },
});

export default withStyles(styles)(OccurrenceAddStepTwo);
