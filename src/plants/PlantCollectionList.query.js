import graphql from "babel-plugin-relay/macro";

const query = graphql`
  query PlantCollectionListQuery($plantID: Int!) {
    plant: lifeNodeByIntID(documentId: $plantID) {
      id
      idInt
      title
      collectionList(first: 20) @connection(key: "Plant_collectionList") {
        edges {
          node {
            id
            user {
              id
              username
              avatar(width: 40, height: 40) {
                url
              }
              ...ProfileLink_user
            }
          }
        }
      }
    }
  }
`;
export default query;
