import graphql from 'babel-plugin-relay/macro';

export const query = graphql`
  fragment PlantSelectField_viewer on Query
    @argumentDefinitions(
      count: {type: "Int", defaultValue: 0}
      search: {type: "String"}
    )
  {
    id
    allLifeNode(first: $count, search: $search) {
      edges {
        node {
          id
          title
          rankDisplay
          images(first: 1) {
            edges {
              node {
                id
                mainImage: image(width: 200, height: 200) {
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

export const refetchQuery = graphql`
  query PlantSelectFieldQuery($count: Int!, $search: String!) {
    viewer {
      id
      ...PlantSelectField_viewer @arguments(count: $count, search: $search)
    }
  }
`

export const renderQuery = graphql`
  query PlantSelectFieldRenderQuery {
    viewer {
      id
      ...PlantSelectField_viewer
    }
  }
`
