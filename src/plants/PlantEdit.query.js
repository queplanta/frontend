import graphql from 'react-relay';

const query = graphql`
  query PlantEditQuery($plantID: Int!) {
    plant: lifeNodeByIntID(documentId: $plantID) {
      id
      title
      description
      edibility
      rank
      document {
        id
      } 
    }
    ranks: __type(name: "Rank") {
      enumValues {
        name
        description
      }
    }
    edibilities: __type(name: "Edibility") {
      enumValues {
        name
        description
      }
    }
  }
`;
export default query
