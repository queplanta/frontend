import React from "react";
import { createFragmentContainer } from "react-relay";
import { Link as RouterLink } from "found";
import { Link, Tooltip, withStyles } from "@material-ui/core";
import fragmentSpec from "./ProfileLink.query.js";

class ProfileLink extends React.Component {
  render() {
    const { user, classes, children } = this.props;
    const title = (
      <div>
        <img
          src={user.avatar.url}
          className={classes.avatar}
          alt={user.username}
        />
        <strong>{user.firstName}</strong>
        <br />
        Reputação: {user.reputation}
      </div>
    );
    return (
      <Tooltip interactive title={title} classes={{ tooltip: classes.tooltip }}>
        <Link to={`/u/${user.username}`} component={RouterLink}>
          {children ? children : user.username}
        </Link>
      </Tooltip>
    );
  }
}

const styles = (theme) => ({
  avatar: {
    width: 40,
    height: 40,
    marginRight: 10,
    verticalAlign: "middle",
  },
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
});

export default createFragmentContainer(
  withStyles(styles)(ProfileLink),
  fragmentSpec
);
