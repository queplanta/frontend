import graphql from 'react-relay';

export const fragmentQuery = graphql`
  fragment PlantList_viewer on Query
  @argumentDefinitions(
    count: {type: "Int", defaultValue: 30}
    cursor: {type: "String"}
    search: {type: "String"}
    edibles: {type: "Boolean"}
  )
  {
    allLifeNode(
      first: $count,
      after: $cursor,
      search: $search,
      edibles: $edibles
    ) @connection(key: "ListLifeNode_allLifeNode") {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        node {
          id,
          ...PlantItem_lifeNode
        }
      }
    }
  }
`;

export const fragmentSpec = {
  viewer: fragmentQuery
}

export const query = graphql`
  query PlantListQuery(
    $count: Int!,
    $cursor: String,
    $search: String,
    $edibles: Boolean
  ) {
    viewer {
      id
      ...PlantList_viewer @arguments(count: $count, cursor: $cursor, edibles: $edibles, search: $search)
    }
  }
`;
