import React from "react";
import { withStyles } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import RoomIcon from "@material-ui/icons/Room";
import UserBottomNav from "./accounts/UserBottomNav.js";
import {
  BottomNavigationRoute,
  BottomNavigationActionRoute,
} from "./lib/BottomNavbars.js";

function BottomNavbar(props) {
  const { classes, viewer } = props;

  return (
    <BottomNavigationRoute showLabels className={classes.root}>
      <BottomNavigationActionRoute
        value="/plantas"
        activeClassName="Mui-selected"
        icon={<SearchIcon />}
      />
      <BottomNavigationActionRoute
        value="/adicionar"
        activeClassName="Mui-selected"
        icon={<CameraAltIcon />}
      />
      <BottomNavigationActionRoute
        value="/mapa"
        activeClassName="Mui-selected"
        icon={<RoomIcon />}
      />
      <UserBottomNav me={viewer.me} />
    </BottomNavigationRoute>
  );
}

const styles = (theme) => ({
  root: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    borderTop: "1px solid #d2d2d2",
    zIndex: 1000,
  },
  navlinkActive: {
    color: theme.palette.action.selected,
  },
});

export default withStyles(styles)(BottomNavbar);
