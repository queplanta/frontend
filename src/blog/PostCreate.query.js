import graphql from 'react-relay';

const query = graphql`
  query PostCreateQuery {
    viewer {
      id
    }
  }
`;
export default query
