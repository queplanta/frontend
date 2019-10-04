import graphql from 'babel-plugin-relay/macro';

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
            voting {
              ...VotingButtons_voting
            }
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
