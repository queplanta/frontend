import React from "react";
import { Helmet } from "react-helmet";
import { Grid, withStyles } from "@material-ui/core";
import { createPaginationContainer } from "react-relay";
import PlantItem from "../plants/PlantItem.js";
import { fragmentSpec, query } from "./UserCollectionList.query.js";
import BreadcrumbsWithHome from "../lib/BreadcrumbsWithHome.js";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";

function UserCollectionList(props) {
  const { user, me } = props;

  if (!user.collectionList || !user.collectionList.edges) {
    return null;
  }

  const title = `Tenho | Plantas | ${user.username}`;
  const baseUrl = `/u/${user.username}`;
  const isMe = me !== null && me.id === user.id;

  return (
    <React.Fragment>
      <Helmet title={title} />
      <BreadcrumbsWithHome>
        <BreadcrumbsItem to={baseUrl}>
          {isMe ? `Meu perfil` : `Perfil de ${user.firstName}`}
        </BreadcrumbsItem>
        <BreadcrumbsItem to={`${baseUrl}/tenho`}>Tenho</BreadcrumbsItem>
      </BreadcrumbsWithHome>
      <Grid container spacing={3}>
        {user.collectionList.edges.map((edge) => {
          const { plant } = edge.node;
          return (
            <Grid item xs={12} md={4} key={edge.node.id}>
              <PlantItem lifeNode={plant} />
            </Grid>
          );
        })}
      </Grid>
    </React.Fragment>
  );
}

const styles = {};

export default createPaginationContainer(
  withStyles(styles)(UserCollectionList),
  fragmentSpec,
  {
    direction: "forward",
    query: query,
    getConnectionFromProps(props) {
      return props.user.collectionList;
    },
    getVariables(props, paginationInfo, fragmentVariables) {
      return {
        ...paginationInfo,
        username: fragmentVariables.username,
      };
    },
  }
);
