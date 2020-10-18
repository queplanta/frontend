import React from "react";
import PropTypes from "prop-types";
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  withStyles,
} from "@material-ui/core";
import StyledBadge from "../lib/StyledBadge";
import LocalFloristIcon from "@material-ui/icons/LocalFlorist";
import { Link } from "../lib/Link.js";

function UserWithBadge(props) {
  const { classes, user } = props;

  return (
    <ListItem component={Link} to={`/u/${user.username}`}>
      <ListItemAvatar>
        <Avatar alt={user.username} src={user.avatar ? user.avatar.url : ""} />
      </ListItemAvatar>
      <ListItemText primary={user.firstName ? user.firstName : user.username} />
      <ListItemSecondaryAction className={classes.root}>
        <StyledBadge
          badgeContent={user.collectionList.totalCount}
          max={999}
          color="primary"
          showZero={true}
        >
          <LocalFloristIcon />
        </StyledBadge>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

const styles = (theme) => ({
  root: {
    minWidth: "45px",
  },
});

export default withStyles(styles)(UserWithBadge);

UserWithBadge.propTypes = {
  user: PropTypes.object.isRequired,
};
