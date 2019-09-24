import graphql from 'react-relay';

const query = graphql`
  query PlantOccurrencesQuery($plantID: Int!) {
    plant: lifeNodeByIntID(documentId: $plantID) {
      id
      idInt
    }
  }
`;
export default query
