import React from "react";
import { createFragmentContainer } from "react-relay";
import { Link, Tooltip, withStyles } from "@material-ui/core";
import { Link as RouterLink } from "found";
import fragmentSpec from "./PlantLink.query.js";

class PlantLink extends React.Component {
  render() {
    const { plant, classes, children } = this.props;
    return (
      <Tooltip
        interactive
        title={plant.title}
        classes={{ tooltip: classes.tooltip }}
      >
        <Link to={`/${plant.slug}-p${plant.idInt}`} component={RouterLink}>
          {children ? children : plant.title}
        </Link>
      </Tooltip>
    );
  }
}

const styles = (theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
});

export default createFragmentContainer(
  withStyles(styles)(PlantLink),
  fragmentSpec
);
