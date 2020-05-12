import graphql from "babel-plugin-relay/macro";

const query = graphql`
  query PostEditQuery($id: ID!) {
    post: post(id: $id) {
      id
      url
      title
      body
      publishedAt
      tags(first: 50) {
        edges {
          node {
            id
            slug
            title
          }
        }
      }
      imaging {
        id
        images(first: 100) @connection(key: "List_images") {
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
  }
`;
export default query;
