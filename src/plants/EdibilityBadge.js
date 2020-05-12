import React from "react";
import { Chip, withStyles } from "@material-ui/core";
import clsx from "clsx";

function EdibilityBadge(props) {
  const { classes, plant } = props;
  let edibility_class = "default";
  if (!plant.edibility) {
    return null;
  }
  edibility_class = plant.edibility.toLowerCase();
  return (
    <Chip
      size="small"
      label={`Comestibilidade: ${plant.edibilityDisplay}`}
      className={clsx(classes[edibility_class], classes.customChip)}
      variant="outlined"
    />
  );
}

const styles = (theme) => ({
  customChip: {
    fontWeight: "bold",
    width: "100%",
    marginBottom: theme.spacing(1),
  },
  default: {
    backgroundColor: "#28a745",
  },
  bad: {
    backgroundColor: "#dc3545",
  },
  poor: {
    backgroundColor: "#ffc107",
  },
  fair: {
    backgroundColor: "#17a2b8",
  },
  good: {
    backgroundColor: "#007bff",
    color: "#000000",
    fontWeight: "bold",
  },
  excellent: {
    backgroundColor: "#28a745",
    borderColor: "#28a745",
    color: "#FFFFFF",
  },
});

export default withStyles(styles)(EdibilityBadge);
