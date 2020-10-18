import graphql from "babel-plugin-relay/macro";

export const fragmentQuery = graphql`
  fragment PeopleWhoPlant_viewer on Query
    @argumentDefinitions(
      count: { type: "Int", defaultValue: 30 }
      cursor: { type: "String" }
    ) {
    allUsers(first: $count, after: $cursor, orderBy: "-collection_count")
      @connection(key: "PeopleWhoPlant_allUsers") {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        node {
          id
          firstName
          lastName
          dateJoined
          username
          reputation
          avatar(width: 40, height: 40) {
            url
          }
          collectionList {
            totalCount
          }
        }
      }
    }
  }
`;

export const fragmentSpec = {
  viewer: fragmentQuery,
};

export const query = graphql`
  query PeopleWhoPlantQuery($count: Int!, $cursor: String) {
    viewer {
      ...PeopleWhoPlant_viewer @arguments(count: $count, cursor: $cursor)
    }
  }
`;

export default query;
