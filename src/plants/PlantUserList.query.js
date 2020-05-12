import graphql from "babel-plugin-relay/macro";

const query = graphql`
  query PlantUserListQuery($plantID: Int!) {
    plant: lifeNodeByIntID(documentId: $plantID) {
      id
      idInt
      title
      commonName {
        name
      }
      slug
      edibility
      edibilityDisplay
      ...RankDisplay_plant
      mainImage: images(first: 1) {
        edges {
          node {
            id
            smallImage: image(width: 225, height: 300) {
              url
            }
            ...ImageThumbnail_image
          }
        }
      }
      document {
        ...RevisionBox_document
      }
      myPerms
    }
  }
`;
export default query;
