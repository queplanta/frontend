import React from "react";
import {
  Grid,
  InputAdornment,
  TextField,
  Typography,
  MenuItem,
  withStyles,
} from "@material-ui/core";
import { FormErrors, TextFieldWithError } from "../FormErrors.js";

function OccurrenceAddStepFour({
  classes,
  when,
  notes,
  type,
  occurranceTypes,
  regional_name,
  local_population,
  cbh,
  dbh,
  total_height,
  canopy_height,
  canopy_position,
  current_health_state,
  current_health_state_description,
  type_of_trunk,
  trunkTypes,
  canopyPositions,
  healthStates,
}) {
  return (
    <div className={classes.container}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Quando?"
            placeholder="agora, hoje, ontem, 21/06/2010..."
            type="text"
            margin="dense"
            variant="outlined"
            fullWidth
            {...when}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Informações adicionais"
            placeholder="O que mais você pode dizer sobre essa planta?"
            type="text"
            margin="dense"
            variant="outlined"
            fullWidth
            multiline
            {...notes}
          />
        </Grid>
      </Grid>
      <Typography variant="overline" gutterBottom>
        Identificação da Matriz
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6} md={3}>
          <TextFieldWithError
            margin="dense"
            variant="outlined"
            label="Tipo"
            errorFilter={{ location: "type" }}
            fullWidth
            select
            {...type}
          >
            {occurranceTypes.enumValues.map((e, i) => {
              return (
                <MenuItem key={i} value={e.name}>
                  {e.description}
                </MenuItem>
              );
            })}
          </TextFieldWithError>
        </Grid>
        <Grid item xs={6} md={3}>
          <TextFieldWithError
            margin="dense"
            variant="outlined"
            label="População local"
            errorFilter={{ location: "local_population" }}
            fullWidth
            {...local_population}
          />
        </Grid>
        <Grid item xs={6} md={6}>
          <TextFieldWithError
            margin="dense"
            variant="outlined"
            label="Nome regional"
            fullWidth
            errorFilter={{ location: "regional_name" }}
            {...regional_name}
          />
        </Grid>
      </Grid>
      <Typography variant="overline" gutterBottom>
        Identificação da Matriz
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6} md={3}>
          <TextFieldWithError
            margin="dense"
            variant="outlined"
            label="CAP"
            fullWidth
            InputProps={{
              endAdornment: <InputAdornment position="end">m</InputAdornment>,
            }}
            errorFilter={{ location: "cbh" }}
            {...cbh}
          />
        </Grid>
        <Grid item xs={6} md={3}>
          <TextFieldWithError
            margin="dense"
            variant="outlined"
            label="Altura total"
            fullWidth
            InputProps={{
              endAdornment: <InputAdornment position="end">m</InputAdornment>,
            }}
            errorFilter={{ location: "total_height" }}
            {...total_height}
          />
        </Grid>
        <Grid item xs={6} md={3}>
          <TextFieldWithError
            margin="dense"
            variant="outlined"
            label="DAP"
            fullWidth
            InputProps={{
              endAdornment: <InputAdornment position="end">m</InputAdornment>,
            }}
            errorFilter={{ location: "dbh" }}
            {...dbh}
          />
        </Grid>
        <Grid item xs={6} md={3}>
          <TextFieldWithError
            margin="dense"
            variant="outlined"
            label="Altura da copa"
            fullWidth
            InputProps={{
              endAdornment: <InputAdornment position="end">m</InputAdornment>,
            }}
            errorFilter={{ location: "canopy_height" }}
            {...canopy_height}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={6} md={4}>
          <TextFieldWithError
            margin="dense"
            variant="outlined"
            label="Tipo de tronco"
            errorFilter={{ location: "type_of_trunk" }}
            fullWidth
            select
            {...type_of_trunk}
          >
            {trunkTypes.enumValues.map((e, i) => {
              return (
                <MenuItem key={i} value={e.name}>
                  {e.description}
                </MenuItem>
              );
            })}
          </TextFieldWithError>
        </Grid>
        <Grid item xs={6} md={4}>
          <TextFieldWithError
            margin="dense"
            variant="outlined"
            label="Posição no dossel"
            errorFilter={{ location: "canopy_position" }}
            fullWidth
            select
            {...canopy_position}
          >
            {canopyPositions.enumValues.map((e, i) => {
              return (
                <MenuItem key={i} value={e.name}>
                  {e.description}
                </MenuItem>
              );
            })}
          </TextFieldWithError>
        </Grid>
        <Grid item xs={6} md={4}>
          <TextFieldWithError
            margin="dense"
            variant="outlined"
            label="Estado da matriz"
            errorFilter={{ location: "current_health_state" }}
            fullWidth
            select
            {...current_health_state}
          >
            {healthStates.enumValues.map((e, i) => {
              return (
                <MenuItem key={i} value={e.name}>
                  {e.description}
                </MenuItem>
              );
            })}
          </TextFieldWithError>
        </Grid>
      </Grid>
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
