import graphql from "babel-plugin-relay/macro";

export const fragmentQuery = graphql`
  fragment RecentPosts_viewer on Query
    @argumentDefinitions(
      count: { type: "Int", defaultValue: 30 }
      cursor: { type: "String" }
    ) {
    allPosts(first: $count, after: $cursor) @connection(key: "Blog_allPosts") {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        node {
          id
          title
          summary
          mainImage {
            id
            smallImage: image(width: 225, height: 300) {
              url
            }
          }
          url
          ...PostItem_post
        }
      }
    }
  }
`;

export const fragmentSpec = {
  viewer: fragmentQuery,
};

export const query = graphql`
  query RecentPostsQuery($count: Int!, $cursor: String) {
    viewer {
      ...RecentPosts_viewer @arguments(count: $count, cursor: $cursor)
    }
  }
`;

export default query;
