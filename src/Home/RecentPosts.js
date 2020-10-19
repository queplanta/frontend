import React from "react";
import PropTypes from "prop-types";
import { createPaginationContainer } from "react-relay";
import { Link as RouterLink } from "found";
import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Link,
  withStyles,
} from "@material-ui/core";
import { fragmentSpec, query } from "./RecentPosts.query.js";

function RecentPosts(props) {
  const {
    classes,
    viewer: {
      allPosts: { edges: posts },
    },
  } = props;

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Postagens recentes
      </Typography>
      <Grid container spacing={3}>
        {posts.map(({ node: post }) => (
          <Grid item xs={12} md={4} key={post.id}>
            <Card>
              {post.mainImage && (
                <CardMedia
                  to={`/blog/${post.url}`}
                  component={RouterLink}
                  image={post.mainImage.smallImage.url}
                  alt={post.title}
                />
              )}
              <CardContent>
                <Link to={`/blog/${post.url}`} component={RouterLink}>
                  <Typography component="h6" variant="h6">
                    {post.title}
                  </Typography>
                </Link>
                <Typography variant="subtitle1" color="textSecondary">
                  {post.summary}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default createPaginationContainer(RecentPosts, fragmentSpec, {
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

RecentPosts.propTypes = {
  viewer: PropTypes.object.isRequired,
};
