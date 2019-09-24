import graphql from 'react-relay';

const query = graphql`
  query PlantPhotosQuery($plantID: Int!) {
    plant: lifeNodeByIntID(documentId: $plantID) {
      id
      idInt
      title
      images(first: 20) {
        edges {
          node {
            id
            smallImage: image(width: 200, height: 200) {
              url
            }
            ...ImageThumbnail_image
          }
        }
      }
    }
  }
`;
export default query
