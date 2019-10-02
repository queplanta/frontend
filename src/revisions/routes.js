import React from 'react';
import Route from '../relay/RouteWithLoading';
import RevisionItem from './RevisionItem.js';
import RevisionItemQuery from './RevisionItem.query.js';

export const revisionsRoutes = <React.Fragment>
  <Route
    path="revisions/revision/:revisionID"
    Component={RevisionItem}
    query={RevisionItemQuery} />
</React.Fragment>