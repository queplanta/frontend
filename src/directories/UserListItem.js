import React from "react";
import { FormattedDate } from "react-intl";
import { Avatar, Grid, Typography, withStyles } from "@material-ui/core";
import { createFragmentContainer } from "react-relay";
import Link from "../lib/Link.js";
import fragmentSpec from "./UserListItem.query.js";

function UserListItem(props) {
  const { user } = props;

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <Avatar
            alt={user.username}
            src={user.avatar ? user.avatar.url : ""}
          />
        </Grid>
        <Grid item xs={10} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Link to={`/u/${user.username}`}>{user.firstName}</Link>
              <br />
              <Typography variant="caption" color="textSecondary">
                Reputação: {user.reputation} <br />
                Desde: <FormattedDate value={user.dateJoined} />
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

const styles = (theme) => ({});

export default createFragmentContainer(
  withStyles(styles)(UserListItem),
  fragmentSpec
);
