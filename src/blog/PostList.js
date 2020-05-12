import React from "react";
import { List, withStyles } from "@material-ui/core";
import { createPaginationContainer } from "react-relay";
import ButtonWithProgress from "../lib/ButtonWithProgress.js";
import PostItem from "./PostItem.js";
import { fragmentSpec, query } from "./PostList.query.js";

function PostList(props) {
  const {
    classes,
    relay,
    viewer: {
      allPosts: { edges: posts },
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
    <React.Fragment>
      <List>
        {posts.map(({ node: post }) => {
          return <PostItem key={post.id} post={post} />;
        })}
      </List>
      <div className={classes.wrapBtn}>
        <ButtonWithProgress
          disabled={!hasMore}
          fullWidth={true}
          variant="outlined"
          isLoading={isLoading}
          onClick={handleLoadMore}
        >
          {!hasMore ? "Fim das postagens" : "Ver mais postagens"}
        </ButtonWithProgress>
      </div>
    </React.Fragment>
  );
}

const styles = (theme) => ({
  wrapBtn: {
    padding: theme.spacing(2),
  },
  actionRoot: {
    right: theme.spacing(2),
  },
});

// export default createFragmentContainer(
//   withStyles(styles)(PostList),
//   query
// )

export default createPaginationContainer(
  withStyles(styles)(PostList),
  fragmentSpec,
  {
    direction: "forward",
    query: query,
    getConnectionFromProps(props) {
      return props.viewer.allPosts;
    },
    getVariables(props, paginationInfo, fragmentVariables) {
      return {
        ...paginationInfo,
      };
    },
  }
);
