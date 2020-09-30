import graphql from "babel-plugin-relay/macro";

export const fragmentQuery = graphql`
  fragment UserCollectionList_viewer on User
    @argumentDefinitions(
      count: { type: "Int", defaultValue: 30 }
      cursor: { type: "String" }
    ) {
    id
    username
    firstName
    collectionList(first: $count, after: $cursor)
      @connection(key: "UserCollectionList_collectionList") {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        node {
          id
          plant {
            id
            ...PlantItem_lifeNode
          }
        }
      }
    }
  }
`;

export const fragmentSpec = {
  user: fragmentQuery,
};

export const query = graphql`
  query UserCollectionListQuery(
    $count: Int!
    $cursor: String
    $username: String!
  ) {
    user: userByUsername(username: $username) {
      id
      ...UserCollectionList_viewer @arguments(count: $count, cursor: $cursor)
    }
    me {
      id
    }
  }
`;

export default query;
