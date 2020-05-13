import React from "react";
import { Helmet } from "react-helmet";
import { Grid, withStyles } from "@material-ui/core";
import ImageThumbnail from "../lib/ImageThumbnail.js";

function PlantDescription(props) {
  const { classes, plant } = props;

  return (
    <React.Fragment>
      <Helmet title={`Fotos de ${plant.title}`} />
      <Grid container spacing={2}>
        {plant.images.edges.map((edge) => {
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
      </Grid>
    </React.Fragment>
  );
}

const styles = (theme) => ({
  marginBottom: {
    marginBottom: theme.spacing(2),
  },
  gridItem: {
    lineHeight: 0,
  },
  img: {
    width: "100%",
  },
});

export default withStyles(styles)(PlantDescription);
