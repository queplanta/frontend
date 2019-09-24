import graphql from 'react-relay';

const query = graphql`
  query PlantDescriptionQuery($plantID: Int!) {
    plant: lifeNodeByIntID(documentId: $plantID) {
      id
      idInt
      description
      ...TaxoClimb_lifeNode
      commonNames(first: 20) {
        edges {
          node {
            id
            name
            language
          }
        }
      }
      commenting {
        ...CommentsList_commenting
      }  
    }
  }
`;
export default query
