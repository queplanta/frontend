import React from "react";
import PropTypes from "prop-types";
import { Link as RouterLink } from "found";
import { Typography, Tabs, Tab, Box } from "@material-ui/core";
import { isBrowser } from "./helpers.js";

export function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

export function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export function TabsRoute(props) {
  return (
    <Tabs value={isBrowser() ? window.location.pathname : null} {...props} />
  );
}

export function TabRoute(props) {
  const { value, ...otherProps } = props;
  return (
    <Tab value={value} to={value} component={RouterLink} {...otherProps} />
  );
}
