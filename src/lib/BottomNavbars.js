import React from "react";
import { Link as RouterLink } from "found";
import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import { isBrowser } from "./helpers.js";

export function BottomNavigationRoute(props) {
  return (
    <BottomNavigation
      value={isBrowser() ? window.location.pathname : null}
      {...props}
    />
  );
}

export function BottomNavigationActionRoute(props) {
  const { value, ...otherProps } = props;
  return (
    <BottomNavigationAction
      value={value}
      to={value}
      component={RouterLink}
      {...otherProps}
    />
  );
}
