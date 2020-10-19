import graphql from "babel-plugin-relay/macro";

export const fragmentQuery = graphql`
  fragment PopularPlants_viewer on Query
    @argumentDefinitions(
      count: { type: "Int", defaultValue: 30 }
      cursor: { type: "String" }
    ) {
    popularPlants: allLifeNode(
      first: $count
      after: $cursor
      orderBy: "-collection_count"
    ) @connection(key: "PopularPlants_popularPlants") {
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
  query PopularPlantsQuery($count: Int!, $cursor: String) {
    viewer {
      id
      ...PopularPlants_viewer @arguments(count: $count, cursor: $cursor)
    }
  }
`;
