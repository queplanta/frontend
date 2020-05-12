import React from "react";
import Route from "../relay/RouteWithLoading";
import Home from "./Home.js";
import HomeQuery from "./Home.query.js";
import OccurrenceAdd from "./OccurrenceAdd.js";
import OccurrenceAddQuery from "./OccurrenceAdd.query.js";
import HomeIdentify from "./identify/Home.js";
import HomeIdentifyQuery from "./identify/Home.query.js";
import HomeIdentified from "./identify/HomeIdentified.js";
import IdentifyPage from "./identify/IdentifyPage.js";
import IdentifyPageQuery from "./identify/IdentifyPage.query.js";
import Occurrence from "./Occurrence.js";
import OccurrenceQuery from "./Occurrence.query.js";

export const occurrencesRoutes = (
  <React.Fragment>
    <Route path="/mapa" Component={Home} query={HomeQuery} />
    <Route
      path="/mapa/adicionar"
      Component={OccurrenceAdd}
      query={OccurrenceAddQuery}
    />
    <Route
      path="/identificacao"
      Component={HomeIdentify}
      query={HomeIdentifyQuery}
    />
    <Route
      path="/identificacao/identificadas"
      Component={HomeIdentified}
      query={HomeIdentifyQuery}
    />
    <Route
      path="/identificacao/pedido"
      Component={IdentifyPage}
      query={IdentifyPageQuery}
    />
    <Route
      path="/observacoes/:id"
      query={OccurrenceQuery}
      render={(args) => {
        const { props, ...otherProps } = args;
        return <Occurrence {...props} relay={otherProps} />;
      }}
    />
  </React.Fragment>
);
