import graphql from 'babel-plugin-relay/macro';

const query = graphql`
  query PlantQuery($plantID: Int!) {
    plant: lifeNodeByIntID(documentId: $plantID) {
      id
      idInt
      title
      slug
      description
      edibility
      edibilityDisplay,
      ...RankDisplay_plant
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
      document {
        revisionsCount
      },
      revisionCreated {
        author {
          ...ProfileLink_user
        }
      }
    }
  }
`;
export default query
