import graphql from 'babel-plugin-relay/macro';

const query = graphql`
  query PlantQuery($plantID: Int!) {
    plant: lifeNodeByIntID(documentId: $plantID) {
      id,
      idInt,
      title,
      slug,
      description,
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
