import React from "react";
import { Typography, withStyles } from "@material-ui/core";
import { Helmet } from "react-helmet";
import { Width } from "../ui";

function NotFound(props) {
  const { classes } = props;

  return (
    <Width>
      <Helmet
        title="Não encontrada"
        meta={[{ name: "status", content: "404" }]}
      />
      <Typography component="h5" variant="h4" className={classes.title}>
        Página não encontrada
      </Typography>
    </Width>
  );
}

const styles = () => ({});

export default withStyles(styles)(NotFound);
