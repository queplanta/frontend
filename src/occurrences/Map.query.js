import graphql from 'babel-plugin-relay/macro';

const query = graphql`
  query MapQuery($count: Int!) {
    viewer {
      allOccurrences(first: $count) {
        edges {
          node {
            id
            identity {
              id
              idInt
              ...PlantLink_plant
              rankDisplay
            }
            location {
              type
              coordinates
            }
          }
        }
      }
    }
  }
`;

export default query