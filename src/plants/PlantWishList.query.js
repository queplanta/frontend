import graphql from "babel-plugin-relay/macro";

const query = graphql`
  query PlantWishListQuery($plantID: Int!) {
    plant: lifeNodeByIntID(documentId: $plantID) {
      id
      idInt
      title
      wishList(first: 20) @connection(key: "Plant_wishList") {
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
