import React from "react";
import { TextField, withStyles } from "@material-ui/core";
import { FormErrors } from "../FormErrors.js";

function OccurrenceAddStepFour({ classes, when, notes }) {
  return (
    <div className={classes.container}>
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

      <FormErrors
        filter={(error) => ["__all__", null].indexOf(error.location) >= 0}
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
  submitButton: {
    marginTop: theme.spacing(1),
  },
});

export default withStyles(styles)(OccurrenceAddStepFour);
