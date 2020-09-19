import React from "react";
import { Helmet } from "react-helmet";
import { withStyles } from "@material-ui/core";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import BreadcrumbsWithHome from "../lib/BreadcrumbsWithHome.js";
import OccurrencesMap from "../occurrences/OccurrencesMap.js";

function UserOccurrenceMap(props) {
  const { user, me, environment, classes } = props;

  const title = `Mapeadas | Plantas | ${user.username}`;
  const baseUrl = `/u/${user.username}`;
  const isMe = me && me.id === user.id;

  return (
    <React.Fragment>
      <Helmet title={title} />
      <BreadcrumbsWithHome>
        <BreadcrumbsItem to={baseUrl}>
          {isMe ? `Meu perfil` : `Perfil de ${user.firstName}`}
        </BreadcrumbsItem>
        <BreadcrumbsItem to={`${baseUrl}/mapeadas`}>Mapeadas</BreadcrumbsItem>
      </BreadcrumbsWithHome>
      <OccurrencesMap
        className={classes.map}
        environment={environment}
        authorId={user.id}
      />
    </React.Fragment>
  );
}

const styles = {
  map: {
    height: 500,
  },
};

export default withStyles(styles)(UserOccurrenceMap);
