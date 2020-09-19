import graphql from "babel-plugin-relay/macro";

const query = graphql`
  query OccurrencesMapQuery($count: Int!, $identity: ID, $author: ID) {
    viewer {
      allOccurrences(
        first: $count
        identity: $identity
        author: $author
        isIdentityNull: false
      ) {
        edges {
          node {
            id
            identity {
              id
              idInt
              title
              commonName {
                name
              }
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

export default query;
