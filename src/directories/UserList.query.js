import graphql from "babel-plugin-relay/macro";

export const fragmentQuery = graphql`
  fragment UserList_viewer on Query
    @argumentDefinitions(
      count: { type: "Int", defaultValue: 30 }
      cursor: { type: "String" }
      startWith: { type: "String" }
    ) {
    allUsers(
      first: $count
      after: $cursor
      nameStartswith: $startWith
      orderBy: "-reputation"
    ) @connection(key: "Directory_allUsers") {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        node {
          id
          ...UserListItem_user
        }
      }
    }
  }
`;

export const fragmentSpec = {
  viewer: fragmentQuery,
};

export const query = graphql`
  query UserListQuery($count: Int!, $cursor: String, $startWith: String!) {
    viewer {
      ...UserList_viewer
        @arguments(count: $count, cursor: $cursor, startWith: $startWith)
    }
  }
`;

export default query;
