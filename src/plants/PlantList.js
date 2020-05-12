import React from "react";
import { Grid, withStyles } from "@material-ui/core";
import { createPaginationContainer } from "react-relay";
import ButtonWithProgress from "../lib/ButtonWithProgress.js";
import PlantItem from "./PlantItem.js";
import { fragmentSpec, query } from "./PlantList.query.js";

function PlantList(props) {
  const {
    relay,
    viewer: {
      allLifeNode: { edges: plants },
    },
  } = props;
  const [isLoading, setLoading] = React.useState(false);
  const hasMore = relay.hasMore();

  function handleLoadMore() {
    if (!hasMore || relay.isLoading()) {
      return;
    }

    setLoading(true);
    relay.loadMore(props.count, (error) => {
      if (error) console.error(error);
      setLoading(false);
    });
  }

  return (
    <Grid container spacing={3}>
      {plants.map(({ node: plant }) => {
        return (
          <Grid item xs={12} md={4} key={plant.id}>
            <PlantItem lifeNode={plant} />
          </Grid>
        );
      })}
      <Grid item xs={12}>
        <ButtonWithProgress
          disabled={!hasMore}
          fullWidth={true}
          variant="outlined"
          isLoading={isLoading}
          onClick={handleLoadMore}
        >
          {!hasMore ? "Fim das plantas" : "Carregar mais plantas"}
        </ButtonWithProgress>
      </Grid>
    </Grid>
  );
}

const styles = (theme) => ({
  wrapBtn: {
    padding: theme.spacing(2, 0),
  },
});

export default createPaginationContainer(
  withStyles(styles)(PlantList),
  fragmentSpec,
  {
    direction: "forward",
    query: query,
    getConnectionFromProps(props) {
      return props.viewer.allLifeNode;
    },
    getVariables(props, paginationInfo, fragmentVariables) {
      return {
        ...fragmentVariables,
        ...paginationInfo,
      };
    },
  }
);
