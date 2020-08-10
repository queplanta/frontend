import React, { useContext, useEffect } from "react";
import Route from "./relay/RouteWithLoading";
import { withStyles } from "@material-ui/core";
import { Width } from "./ui";
import HomeQuery from "./Home.query.js";
import OccurrencesMap from "./occurrences/OccurrencesMap.js";
import HeaderToolbar from "./HeaderToolbar.js";
import { ToolbarHeaderContext } from "./ToolbarHeaderContext.js";

function Home(props) {
  const { classes, environment } = props;

  const toolbarContext = useContext(ToolbarHeaderContext);
  useEffect(() => {
    toolbarContext.setToolbarHeader(
      <HeaderToolbar viewer={props.viewer} location={props.match.location} />
    );
  }, []);

  return (
    <Width component="div">
      <OccurrencesMap className={classes.map} environment={environment} />
    </Width>
  );
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
    height: 500,
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
