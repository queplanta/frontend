import graphql from 'babel-plugin-relay/macro';

const query = graphql`
  query PlantDescriptionQuery($plantID: Int!) {
    plant: lifeNodeByIntID(documentId: $plantID) {
      id
      idInt
      description
      myPerms
      ...TaxoClimb_lifeNode
      commonNames(first: 20) @connection(key: "lifeNode__commonNames") {
        edges {
          node {
            id
            ...CommonNameItem_commonName
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
