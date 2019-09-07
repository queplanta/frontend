import graphql from 'babel-plugin-relay/macro';

export const fragmentQuery = graphql`
  fragment PlantList_viewer on Query
  @argumentDefinitions(
    count: {type: "Int", defaultValue: 30}
    cursor: {type: "String"}
  )
  {
    allLifeNode(
      first: $count,
      after: $cursor
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

export const query = graphql`
  query PlantListQuery(
    $count: Int!,
    $cursor: String,
  ) {
    viewer {
      id
      ...PlantList_viewer @arguments(count: $count, cursor: $cursor)
    }
  }
`;
