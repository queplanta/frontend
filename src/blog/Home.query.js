import graphql from 'babel-plugin-relay/macro';

const query = graphql`
  query HomeBlogQuery {
    viewer {
      ...PostList_viewer
    }
  }
`;

export default query