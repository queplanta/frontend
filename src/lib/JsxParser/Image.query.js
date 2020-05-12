import graphql from "babel-plugin-relay/macro";

export const query = graphql`
  query ImageQuery($id: ID!, $width: Int!, $height: Int!) {
    image(id: $id) {
      id
      description
      smallImage: image(width: $width, height: $height) {
        url
      }
      ...ImageThumbnail_image
    }
  }
`;
