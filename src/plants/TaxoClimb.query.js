import graphql from 'babel-plugin-relay/macro';

export const fragmentQuery = graphql`
  fragment TaxoClimb_lifeNode on LifeNode
  @argumentDefinitions(
    count: {type: "Int", defaultValue: 30}
    cursor: {type: "String"}
  )
  {
    children(
      first: $count,
      after: $cursor
    ) @connection(key: "ListLifeNode_children") {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        node {
          id,
          rankDisplay
          ...PlantLink_plant
        }
      }
    }
  }
`;

export const query = graphql`
  query TaxoClimbQuery(
    $count: Int!,
    $cursor: String,
    $plantID: Int!
  ) {
    lifeNodeByIntID(documentId: $plantID) {
      ...TaxoClimb_lifeNode @arguments(count: $count, cursor: $cursor)
    }
  }
`;
