import graphql from "babel-plugin-relay/macro";

export const fragmentQuery = graphql`
  fragment PlantList_viewer on Query
    @argumentDefinitions(
      count: { type: "Int", defaultValue: 30 }
      cursor: { type: "String" }
      search: { type: "String" }
      edibles: { type: "Boolean" }
      edibility: { type: "[Edibility]" }
      rank: { type: "[Rank]" }
      flowerColors: { type: "[String]" }
      leafType: { type: "[String]" }
      phyllotaxy: { type: "[String]" }
      flowerTypes: { type: "[String]" }
      fruitType: { type: "[String]" }
      growthHabit: { type: "[String]" }
      threatened: { type: "[String]" }
    ) {
    allLifeNode(
      first: $count
      after: $cursor
      search: $search
      edibles: $edibles
      edibility: $edibility
      rank: $rank
      flowerColors: $flowerColors
      leafType: $leafType
      phyllotaxy: $phyllotaxy
      flowerTypes: $flowerTypes
      fruitType: $fruitType
      growthHabit: $growthHabit
      threatened: $threatened
    ) @connection(key: "ListLifeNode_allLifeNode") {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        node {
          id
          ...PlantItem_lifeNode
        }
      }
    }
  }
`;

export const fragmentSpec = {
  viewer: fragmentQuery,
};

export const query = graphql`
  query PlantListQuery(
    $count: Int!
    $cursor: String
    $search: String
    $edibles: Boolean
  ) {
    viewer {
      id
      ...PlantList_viewer
        @arguments(
          count: $count
          cursor: $cursor
          edibles: $edibles
          search: $search
        )
    }
  }
`;
