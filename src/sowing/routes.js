import React from "react";
import Route from "../relay/RouteWithLoading";
import SowingAdd from "./SowingAdd.js";
import SowingAddQuery from "./SowingAdd.query.js";

export const sowingRoutes = (
  <React.Fragment>
    <Route
      path="/adicionar/semeadura"
      Component={SowingAdd}
      query={SowingAddQuery}
    />
  </React.Fragment>
);
