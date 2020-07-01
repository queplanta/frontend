import React from "react";
import ReactJsxParser from "react-jsx-parser";
import { Typography, Grid, Paper, withStyles } from "@material-ui/core";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent,
} from "@material-ui/lab";
import { useTheme } from "@material-ui/core/styles";
import withWidth, { isWidthDown, isWidthUp } from "./withWidth.js";
import Link from "./Link.js";
import Image from "./JsxParser/Image.js";

const TimelineOppositeContentMobile = withStyles({})(TimelineOppositeContent);

const TimelineItemMobile = withStyles((theme) => ({
  missingOppositeContent: {
    "&:before": {
      [theme.breakpoints.down("sm")]: {
        display: "none",
      },
    },
  },
}))(TimelineItem);

const JsxParser = (props) => {
  const { environment, classes, width, ...otherProps } = props;
  const theme = useTheme();

  const isWidthDownWith = (breakpoint, inclusive = true) =>
    isWidthDown(breakpoint, width, inclusive);
  const isWidthUpWith = (breakpoint, inclusive = true) =>
    isWidthUp(breakpoint, width, inclusive);

  return (
    <div className={classes.root}>
      <ReactJsxParser
        bindings={{
          environment,
          theme,
          isWidthDown: isWidthDownWith,
          isWidthUp: isWidthUpWith,
          width,
        }}
        showWarnings={true}
        renderInWrapper={false}
        components={{
          Link,
          Image: (imgProps) => (
            <Image environment={environment} {...imgProps} />
          ),
          Typography,
          Grid,
          Paper,
          Timeline,
          TimelineItem,
          TimelineItemMobile,
          TimelineSeparator,
          TimelineConnector,
          TimelineContent,
          TimelineDot,
          TimelineOppositeContent,
        }}
        {...otherProps}
      />
    </div>
  );
};

export default withStyles((theme) => ({
  root: {
    "& ol, & ul": {
      listStylePosition: "inside",
    },
  },
}))(withWidth()(JsxParser));
