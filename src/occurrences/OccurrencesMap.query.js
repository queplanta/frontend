import graphql from 'react-relay';

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
              images(first: 1) {
                edges {
                  node {
                    id
                    smallImage: image(width: 440, height: 520) {
                      url
                    }
                  }
                }
              }
            }
            location {
              type
              coordinates
            }
            author {
              id
              ...ProfileLink_user
            }
            revisionCreated {
              createdAt
            }
          }
        }
      }
    }
  }
`;

export default query