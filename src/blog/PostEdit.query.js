import graphql from 'babel-plugin-relay/macro';

const query = graphql`
  query PostEditQuery($id: ID!) {
    post: post(id: $id) {
      id,
      url,
      title,
      body,
      publishedAt,
      tags(first: 50) {
        edges {
          node {
            id,
            slug,
            title,
          }
        }
      }
    }
  }
`;
export default query
