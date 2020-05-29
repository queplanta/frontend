import React from "react";
import Route from "../relay/RouteWithLoading";
import RevisionList from "./RevisionList.js";
import RevisionListQuery from "./RevisionList.query.js";
import RevisionItem from "./RevisionItem.js";
import RevisionItemQuery from "./RevisionItem.query.js";

export const revisionsRoutes = (
  <React.Fragment>
    <Route
      path="revisions/:nodeID"
      component={RevisionList}
      query={RevisionListQuery}
    />
    <Route
      path="revisions/revision/:revisionID"
      query={RevisionItemQuery}
      render={(args) => {
        return <RevisionItem {...args.props} environment={args.environment} />;
      }}
    />
  </React.Fragment>
);
