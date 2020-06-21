import React from "react";
import {
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  withStyles,
} from "@material-ui/core";
import PlantSelectField from "../plants/PlantSelectField.js";

function OccurrenceAddStepThree({
  classes,
  environment,
  setLifeNode,
  lifeNode,
  occurrenceType,
  setOccurrenceType,
}) {
  const handleChange = (event) => {
    setOccurrenceType(event.target.value);
  };

  return (
    <div className={classes.container}>
      <Typography variant="body2">
        Sabe a espécie ou gostaria de pedir identificação?
      </Typography>
      <RadioGroup
        aria-label="selectType"
        name="selectType"
        value={occurrenceType}
        onChange={handleChange}
        className={classes.RadioGroup}
      >
        <FormControlLabel
          value="occurrence"
          control={<Radio />}
          label="Sei a espécie"
        />
        {occurrenceType === "occurrence" && (
          <PlantSelectField
            environment={environment}
            onChange={setLifeNode}
            value={lifeNode}
          />
        )}
        <FormControlLabel
          value="identify"
          control={<Radio />}
          label="Pedir identificação"
        />
      </RadioGroup>
    </div>
  );
}

const styles = (theme) => ({
  container: {
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(3),
    },
  },
  RadioGroup: {
    marginTop: theme.spacing(2),
  },
  btn: {
    margin: theme.spacing(5, 0),
    padding: theme.spacing(5, 3),
  },
  separator: {
    color: "#757575",
    textAlign: "center",
    display: "inline-block",
    margin: theme.spacing(5, 3),
  },
});

export default withStyles(styles)(OccurrenceAddStepThree);
