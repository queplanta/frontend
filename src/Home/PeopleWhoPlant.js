import React from "react";
import PropTypes from "prop-types";
import { createPaginationContainer } from "react-relay";
import { Paper, List, ListSubheader } from "@material-ui/core";
import UserWithBadge from "../members/UserWithBadge.js";
import { fragmentSpec, query } from "./PeopleWhoPlant.query.js";

function PeopleWhoPlant(props) {
  const {
    viewer: {
      allUsers: { edges: users },
    },
  } = props;

  return (
    <Paper>
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader
            disableSticky={true}
            component="div"
            id="nested-list-subheader"
          >
            Gente que planta
          </ListSubheader>
        }
      >
        {users &&
          users.map(({ node: user }) => (
            <UserWithBadge user={user} key={user.id} />
          ))}
      </List>
    </Paper>
  );
}

export default createPaginationContainer(PeopleWhoPlant, fragmentSpec, {
  direction: "forward",
  query: query,
  getConnectionFromProps(props) {
    return props.viewer.allUsers;
  },
  getVariables(props, paginationInfo, fragmentVariables) {
    return {
      ...paginationInfo,
    };
  },
});

PeopleWhoPlant.propTypes = {
  viewer: PropTypes.object.isRequired,
};
