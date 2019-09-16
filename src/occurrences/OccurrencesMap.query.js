import graphql from 'babel-plugin-relay/macro';

const query = graphql`
  query OccurrencesMapQuery($count: Int!, $identity: ID)
  {
    viewer {
      allOccurrences(first: $count, identity: $identity, isIdentityNull: false) {
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