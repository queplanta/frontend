import React from "react";
import Route from "../relay/RouteWithLoading";
import Profile from "./Profile.js";
import ProfileQuery from "./Profile.query.js";
import ProfileEdit from "./ProfileEdit.js";
import ProfileEditQuery from "./ProfileEdit.query.js";
import ProfileChangePassword from "./ProfileChangePassword.js";
import ProfileChangePasswordQuery from "./ProfileChangePassword.query.js";
import ProfileChangeAvatar from "./ProfileChangeAvatar.js";
import ProfileChangeAvatarQuery from "./ProfileChangeAvatar.query.js";
import ResetPasswordComplete from "./ResetPasswordComplete.js";
import ResetPasswordCompleteQuery from "./ResetPasswordComplete.query.js";
import ProfileSettings from "./ProfileSettings.js";
import UserActivityList from "./UserActivityList.js";
import UserActivityListQuery from "./UserActivityList.query.js";
import UserPlantList from "./UserPlantList.js";
import UserPlantListQuery from "./UserPlantList.query.js";
import UserCollectionList from "./UserCollectionList.js";
import UserCollectionListQuery from "./UserCollectionList.query.js";

export const accountsRoutes = (
  <React.Fragment>
    <Route path="u/:username" Component={Profile} query={ProfileQuery}>
      <Route
        query={UserActivityListQuery}
        render={(args) => {
          return (
            <UserActivityList {...args.props} environment={args.environment} />
          );
        }}
        prepareVariables={(params) => ({
          ...params,
          count: 30,
        })}
      />
      <Route
        path="quero-ter"
        query={UserPlantListQuery}
        render={(args) => {
          return (
            <UserPlantList {...args.props} environment={args.environment} />
          );
        }}
        prepareVariables={(params) => ({
          ...params,
          count: 30,
        })}
      />
      <Route
        path="tenho"
        query={UserCollectionListQuery}
        render={(args) => {
          return (
            <UserCollectionList
              {...args.props}
              environment={args.environment}
            />
          );
        }}
        prepareVariables={(params) => ({
          ...params,
          count: 30,
        })}
      />
    </Route>
    <Route path="/conta" Component={ProfileSettings}>
      <Route
        path="/editar"
        query={ProfileEditQuery}
        render={(args) => {
          return <ProfileEdit {...args.props} environment={args.environment} />;
        }}
      />
      <Route
        path="/editar/senha"
        query={ProfileChangePasswordQuery}
        render={(args) => {
          return (
            <ProfileChangePassword
              {...args.props}
              environment={args.environment}
            />
          );
        }}
      />
      <Route
        path="/editar/avatar"
        query={ProfileChangeAvatarQuery}
        render={(args) => {
          return (
            <ProfileChangeAvatar
              {...args.props}
              environment={args.environment}
            />
          );
        }}
      />
    </Route>
    <Route
      path="/conta/resetar-senha/:uidb64/:token"
      query={ResetPasswordCompleteQuery}
      render={(args) => {
        return (
          <ResetPasswordComplete
            {...args.props}
            environment={args.environment}
          />
        );
      }}
    />
  </React.Fragment>
);
