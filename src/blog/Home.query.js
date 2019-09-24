import graphql from 'react-relay';

const query = graphql`
  query HomeBlogQuery {
    viewer {
      ...PostList_viewer
    }
  }
`;

export default query