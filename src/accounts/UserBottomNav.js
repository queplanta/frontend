import React, { Component } from "react";
import { createFragmentContainer } from "react-relay";
import { Avatar, BottomNavigationAction, withStyles } from "@material-ui/core";
import _ from "lodash";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import fragmentSpec from "./Navbar.query.js";
import DeauthMutation from "./Deauth.mutation.js";
import { withLoginRequired } from "./LoginRequired.js";
import UserMenu from "./UserMenu.js";

class UserBottomNav extends Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleOpenLoginDialog = this.handleOpenLoginDialog.bind(this);
    this.state = { anchorEl: null };
  }

  handleLogout(e) {
    const { relay } = this.props;
    DeauthMutation.commit(relay.environment);
  }

  handleClose() {
    this.setState({ anchorEl: null });
  }

  handleOpen(e) {
    this.setState({ anchorEl: e.currentTarget });
  }

  handleOpenLoginDialog() {
    this.props.openAuthDialog();
  }

  render() {
    const { classes, me } = this.props;
    const { anchorEl } = this.state;

    if (me !== null && me.isAuthenticated === true) {
      const AvatarIcon = (
        <Avatar
          className={classes.avatar}
          alt={me.username}
          src={_.get(me, "avatar.url", null)}
        />
      );
      return (
        <React.Fragment>
          <BottomNavigationAction
            icon={AvatarIcon}
            onClick={this.handleOpen}
            component="a"
          />
          <UserMenu
            me={me}
            handleClose={this.handleClose}
            handleLogout={this.handleLogout}
            anchorEl={anchorEl}
          />
        </React.Fragment>
      );
    } else {
      return (
        <BottomNavigationAction
          icon={<AccountCircleIcon />}
          onClick={this.handleOpenLoginDialog}
          component="a"
        />
      );
    }
  }
}

const styles = {
  avatar: {
    position: "relative",
    top: "-3px",
    cursor: "pointer",
    width: "24px",
    height: "24px",
  },
};

export default createFragmentContainer(
  withStyles(styles)(withLoginRequired(UserBottomNav)),
  fragmentSpec
);
