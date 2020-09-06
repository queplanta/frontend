import React from "react";
import Route from "./relay/RouteWithLoading";
import { withStyles } from "@material-ui/core";
import HomeQuery from "./Home.query.js";
import OccurrencesMap from "./occurrences/OccurrencesMap.js";

function Home(props) {
  const { classes, environment } = props;
  return <OccurrencesMap className={classes.map} environment={environment} />;
}

const styles = (theme) => ({
  titleWhat: {
    paddingBottom: theme.spacing(2),
  },
  title: {
    padding: theme.spacing(2, 2, 0, 2),
  },
  gridPaddingBottom: {
    paddingBottom: theme.spacing(2),
  },
  map: {
    height: "calc(100vh - 56px - 56px)" /* minus footer and header */,
  },
});

const HomeStyled = withStyles(styles)(Home);

export const homeRoute = (
  <Route
    query={HomeQuery}
    render={(args) => (
      <HomeStyled {...args.props} environment={args.environment} />
    )}
  />
);
