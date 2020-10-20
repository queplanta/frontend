import React from "react";
import Route from "../relay/RouteWithLoading";
import { Button, Grid, Paper, Typography, withStyles } from "@material-ui/core";
import { Link as RouterLink } from "found";
import HomeQuery from "./index.query.js";
import OccurrencesMap from "../occurrences/OccurrencesMap.js";
import PeopleWhoPlant from "./PeopleWhoPlant.js";
import PopularPlants from "./PopularPlants.js";
import MostDesiredPlants from "./MostDesiredPlants.js";
import RecentPosts from "./RecentPosts.js";
import VisitShop from "./VisitShop.js";
import { Width } from "../ui";

function Home(props) {
  const { classes, environment, viewer } = props;

  return (
    <Width>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.BannerAddPlant}>
            <Typography variant="h3" component="h2" gutterBottom>
              Ajude o Que Planta a catalogar sua cidade!
            </Typography>
            <Button
              component={RouterLink}
              to="/adicionar"
              variant="contained"
              color="primary"
            >
              Começar a catalogar
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <OccurrencesMap
            className={classes.map}
            environment={environment}
            boxZoom={false}
            scrollWheelZoom={false}
            dragging={false}
            noMoveStart={false}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <VisitShop />
        </Grid>
        <Grid item xs={12} md={4}>
          <PopularPlants viewer={viewer} />
        </Grid>
        <Grid item xs={12} md={4}>
          <MostDesiredPlants viewer={viewer} />
        </Grid>
        <Grid item xs={12} md={4}>
          <PeopleWhoPlant viewer={viewer} />
        </Grid>
        <Grid item xs={12}>
          <RecentPosts viewer={viewer} />
        </Grid>
      </Grid>
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
    borderRadius: "4px",
    boxShadow:
      "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
    height: "100%",
    [theme.breakpoints.down("sm")]: {
      height: "240px",
    },
  },
  BannerAddPlant: {
    marginTop: "12px",
    padding: theme.spacing(4),
    textAlign: "center",
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
