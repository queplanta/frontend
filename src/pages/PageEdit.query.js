import graphql from 'babel-plugin-relay/macro';

const query = graphql`
  query PageEditQuery($id: ID!) {
    page: page(id: $id) {
      id,
      url,
      title,
      body,
      publishedAt,
    }
  }
`;
export default query
