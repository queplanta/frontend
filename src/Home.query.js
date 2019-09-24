import graphql from 'react-relay';

const query = graphql`
  query HomeQuery {
    viewer {
      ...PostList_viewer @arguments(count: 10)
    }
  }
`;
export default query
