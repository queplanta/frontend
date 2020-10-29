import React from "react";
import PropTypes from "prop-types";
import { createPaginationContainer } from "react-relay";
import {
  Avatar,
  Paper,
  List,
  ListSubheader,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@material-ui/core";
import Link from "../lib/Link.js";
import _ from "lodash";
import { fragmentSpec, query } from "./PopularPlants.query.js";
import imgDefault from "../assets/plant-default.svg";

const PopularPlantItem = ({ plant }) => {
  const mainImage = _.get(
    plant,
    "images.edges[0].node.bigImage.url",
    imgDefault
  );

  return (
    <ListItem component={Link} to={`/${plant.slug}-p${plant.idInt}`}>
      <ListItemAvatar>
        <Avatar alt={plant.title} src={mainImage} />
      </ListItemAvatar>
      <ListItemText primary={plant.title} />
    </ListItem>
  );
};

function PopularPlants(props) {
  const {
    viewer: {
      popularPlants: { edges: plants },
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
            Plantas populares
          </ListSubheader>
        }
      >
        {plants &&
          plants.map(({ node: plant }) => (
            <PopularPlantItem plant={plant} key={plant.id} />
          ))}
      </List>
    </Paper>
  );
}

export default createPaginationContainer(PopularPlants, fragmentSpec, {
  direction: "forward",
  query: query,
  getConnectionFromProps(props) {
    return props.viewer.popularPlants;
  },
  getVariables(props, paginationInfo, fragmentVariables) {
    return {
      ...paginationInfo,
    };
  },
});

PopularPlants.propTypes = {
  viewer: PropTypes.object.isRequired,
};
