import React from "react";
import Helmet from "react-helmet";
import { Box, Paper, Typography, withStyles } from "@material-ui/core";
import { Width } from "../ui";
import PageTitle from "../lib/PageTitle.js";
import { TabsRoute, TabRoute } from "../lib/Tabs.js";

function Home(props) {
  const {
    classes,
    children,
    match: { params },
  } = props;
  const alphabet = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];

  return (
    <Width>
      <Helmet title={`Diretório de membros - ${params.letter.toUpperCase()}`} />
      <Paper className={classes.root}>
        <PageTitle>Diretório de membros</PageTitle>
        <Typography variant="body2" component="p">
          Procurar membros públicos do <strong>Que Planta</strong> em ordem
          alfabética por nome de conta.
        </Typography>
        <TabsRoute
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
        >
          {alphabet.map((letter, i) => {
            return (
              <TabRoute
                key={letter}
                className={classes.tabRoute}
                label={letter}
                wrapped
                value={`/diretorio/membros/${letter.toLowerCase()}`}
              />
            );
          })}
        </TabsRoute>
        <Typography component="div" role="tabpanel">
          <Box className={classes.box} p={3}>
            {children}
          </Box>
        </Typography>
      </Paper>
    </Width>
  );
}

const styles = (theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  box: {
    padding: theme.spacing(3, 0),
  },
  tabRoute: {
    paddingTop: theme.spacing(2),
    minWidth: "24px",
    maxWidth: "32px",
    fontSize: "24px",
  },
});

export default withStyles(styles)(Home);
