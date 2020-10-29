import graphql from "babel-plugin-relay/macro";

export const fragmentQuery = graphql`
  fragment MostDesiredPlants_viewer on Query
    @argumentDefinitions(
      count: { type: "Int", defaultValue: 30 }
      cursor: { type: "String" }
    ) {
    mostDesiredPlants: allLifeNode(
      first: $count
      after: $cursor
      orderBy: "-wish_count"
    ) @connection(key: "MostDesiredPlants_mostDesiredPlants") {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        node {
          id
          idInt
          title
          slug
          ...PlantItem_lifeNode
          images(first: 1) {
            edges {
              node {
                id
                bigImage: image(width: 440, height: 520) {
                  url
                }
              }
            }
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
  query MostDesiredPlantsQuery($count: Int!, $cursor: String) {
    viewer {
      id
      ...MostDesiredPlants_viewer @arguments(count: $count, cursor: $cursor)
    }
  }
`;
