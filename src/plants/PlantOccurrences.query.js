import graphql from "babel-plugin-relay/macro";

const query = graphql`
  query PlantOccurrencesQuery($plantID: Int!) {
    plant: lifeNodeByIntID(documentId: $plantID) {
      id
      idInt
      title
    }
  }
`;
export default query;
