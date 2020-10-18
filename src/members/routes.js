import React from "react";
import Route from "../relay/RouteWithLoading";
import Home from "./Home.js";
import HomeDirectoryQuery from "./Home.query.js";
import UserList from "./UserList.js";
import UserListQuery from "./UserList.query.js";

export const membersRoutes = (
  <React.Fragment>
    <Route
      path="/diretorio/membros"
      Component={Home}
      query={HomeDirectoryQuery}
    >
      <Route
        path=":letter"
        query={UserListQuery}
        render={(args) => {
          const { props, ...otherProps } = args;
          return <UserList {...props} relay={otherProps} />;
        }}
        prepareVariables={(params) => {
          return { ...params, count: 30, startWith: params.letter || "a" };
        }}
      />
    </Route>
  </React.Fragment>
);
