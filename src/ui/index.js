import React from "react";
import { withStyles } from "@material-ui/core";
export { RelativeDate } from "./RelativeDate.js";

export const Width = withStyles((theme) => ({
  root: {
    maxWidth: 1140,
    width: "100%",
    margin: "0 auto",
    padding: 20,
  },
}))(({ classes, component, ...others }) => {
  let Component = "div";
  if (typeof component !== "undefined") {
    Component = component;
  }
  return <Component className={classes.root} {...others} />;
});
