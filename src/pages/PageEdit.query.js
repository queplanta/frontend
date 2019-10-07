import graphql from 'babel-plugin-relay/macro';

const query = graphql`
  query PageEditQuery($id: ID!) {
    page: page(id: $id) {
      id,
      url,
      title,
      body,
      publishedAt,
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
export default query
