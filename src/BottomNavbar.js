import React from "react";
import { Hidden, withStyles } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import MapIcon from "@material-ui/icons/Map";
import UserBottomNav from "./accounts/UserBottomNav.js";
import {
  BottomNavigationRoute,
  BottomNavigationActionRoute,
} from "./lib/BottomNavbars.js";

function BottomNavbar(props) {
  const { classes, viewer } = props;

  return (
    <Hidden mdUp implementation="css" className={classes.root}>
      <BottomNavigationRoute showLabels={false}>
        <BottomNavigationActionRoute
          value="/"
          activeClassName="Mui-selected"
          exact={true}
          icon={<HomeIcon />}
        />
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
          icon={<MapIcon />}
        />
        <UserBottomNav me={viewer.me} />
      </BottomNavigationRoute>
    </Hidden>
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
    backgroundColor: theme.palette.background.paper,
    paddingBottom: "env(safe-area-inset-bottom)",
  },
  navlinkActive: {
    color: theme.palette.action.selected,
  },
});

export default withStyles(styles)(BottomNavbar);
