import React from "react";
import { Helmet } from "react-helmet";
import { Grid, Avatar, withStyles } from "@material-ui/core";
import ProfileLink from "../accounts/ProfileLink.js";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";

function PlantCollectionList(props) {
  const { plant } = props;
  const baseUrl = `/${plant.slug}-p${plant.idInt}`;

  return (
    <React.Fragment>
      <Helmet title={`Quem Tem ${plant.title}`} />
      <BreadcrumbsItem to={`${baseUrl}/quem-tem`}>Quem tem</BreadcrumbsItem>
      <Grid container spacing={2}>
        {plant.collectionList.edges.map((edge) => {
          if (!edge.node) {
            return null;
          }

          const user = edge.node.user;
          return (
            <Grid item xs={1} key={edge.node.id}>
              <ProfileLink user={user}>
                <Avatar alt={user.username} src={user.avatar.url} />
              </ProfileLink>
            </Grid>
          );
        })}
      </Grid>
    </React.Fragment>
  );
}

const styles = {};

export default withStyles(styles)(PlantCollectionList);
