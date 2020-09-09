import React from "react";
import { Grid, Paper, Typography, withStyles } from "@material-ui/core";
import _ from "lodash";
import { createFragmentContainer } from "react-relay";
import { Map, Marker } from "./Map.js";
import fragmentSpec from "./OccurrenceDetails.query.js";
import ImageThumbnail from "../lib/ImageThumbnail.js";
import ImgDefault from "../plants/PlantImgDefault.js";
import CommentsList from "../comments/CommentsList.js";
import RevisionBox from "../revisions/RevisionBox.js";
import DeleteButton from "../lib/DeleteButton.js";
import OccurrenceDeleteMutation from "./OccurrenceDelete.mutation.js";
import { hasPerm } from "../lib/perms.js";

function OccurrenceDetails(props) {
  const { occurrence, classes, relay } = props;
  const plant = occurrence.identity;
  const mainImage = _.get(plant, "mainImage.edges[0].node");

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={3}>
        <Paper className={classes.root}>
          <div>
            {mainImage ? (
              <ImageThumbnail
                alt={plant.title}
                image={mainImage}
                src={mainImage.smallImage.url}
                className={classes.mainImage}
              />
            ) : (
              <ImgDefault alt={plant.title} className={classes.mainImage} />
            )}
          </div>
        </Paper>
        <Paper className={classes.root}>
          <RevisionBox
            document={occurrence.document}
            objectId={occurrence.id}
          />
        </Paper>
        {hasPerm(occurrence, "delete") && (
          <DeleteButton
            environment={relay.environment}
            node={occurrence}
            mutation={OccurrenceDeleteMutation}
          />
        )}
      </Grid>
      <Grid item xs={12} md={9}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={5}>
            {occurrence.notes && (
              <>
                <Typography variant="h6" gutterBottom>
                  Informações adicionais:
                </Typography>
                <Typography variant="body1">{occurrence.notes}</Typography>
              </>
            )}
          </Grid>
          <Grid item xs={12} md={7}>
            <Map
              className={classes.map}
              center={occurrence.location.coordinates}
            >
              <Marker position={occurrence.location.coordinates} />
            </Map>
          </Grid>
          {/*<Grid item xs={12}>
            <Button variant="outlined">Pedir cuidado</Button>
          </Grid>
          <Grid item xs={12}>
            <MuiAlert elevation={3} variant="filled" severity="warning">
              <strong>Pedido aberto:</strong> poda, adicionado por{" "}
              <strong style={{ textDecoration: "underline" }}>alisson</strong>{" "}
              há 1 dia.
            </MuiAlert>
          </Grid>*/}
          {occurrence.images.edges.map((edge) => {
            const image = edge.node;
            return (
              <Grid item xs={3} key={image.id} className={classes.gridItem}>
                <ImageThumbnail
                  alt={plant.title}
                  image={image}
                  src={image.smallImage.url}
                  className={classes.img}
                />
              </Grid>
            );
          })}
          <Grid item xs={12}>
            <CommentsList commenting={occurrence.commenting} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

const styles = (theme) => ({
  root: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  mainImage: {
    width: "100%",
  },
  gridItem: {
    lineHeight: 0,
  },
  img: {
    width: "100%",
  },
  map: {
    height: 200,
  },
});

export default createFragmentContainer(
  withStyles(styles)(OccurrenceDetails),
  fragmentSpec
);
