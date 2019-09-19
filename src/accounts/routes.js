import React from 'react';
import Route from '../relay/RouteWithLoading';
import Profile from './Profile.js';
import ProfileQuery from './Profile.query.js';
import UserActivityList from './UserActivityList.js';
import UserActivityListQuery from './UserActivityList.query.js';

export const accountsRoutes = <React.Fragment>
  <Route
    path="u/:username"
    Component={Profile}
    query={ProfileQuery}
  >
    <Route
      query={UserActivityListQuery}
      render={(args) => {
        return <UserActivityList {...args.props} environment={args.environment} />
      }}
      prepareVariables={(params) => ({
        ...params,
        count: 30,
      })}
    />
  </Route>
</React.Fragment>

