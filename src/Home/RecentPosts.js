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
  makeStyles,
} from "@material-ui/core";
import { fragmentSpec, query } from "./RecentPosts.query.js";

const useStyles = makeStyles({
  media: {
    height: 160,
  },
});

const RecentPostItem = ({ post }) => {
  const classes = useStyles();

  return (
    <Grid item xs={12} md={4} key={post.id}>
      <Card>
        {post.mainImage && (
          <CardMedia
            to={`/blog/${post.url}`}
            component={RouterLink}
            className={classes.media}
            image={post.mainImage.smallImage.url}
            height="123"
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
  );
};

function RecentPosts(props) {
  const {
    viewer: {
      recentPosts: { edges: posts },
    },
  } = props;

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Postagens recentes
      </Typography>
      <Grid container spacing={3}>
        {posts.map(({ node: post }) => (
          <RecentPostItem post={post} key={post.id} />
        ))}
      </Grid>
    </>
  );
}

export default createPaginationContainer(RecentPosts, fragmentSpec, {
  direction: "forward",
  query: query,
  getConnectionFromProps(props) {
    return props.viewer.recentPosts;
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
