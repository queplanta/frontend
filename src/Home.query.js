import graphql from 'babel-plugin-relay/macro';

const query = graphql`
  query HomeQuery {
    viewer {
      ...LatestPosts_viewer
    }
  }
`;
export default query
