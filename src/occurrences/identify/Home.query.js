import graphql from 'react-relay';

const query = graphql`
  query HomeIdentifyQuery {
    viewer {
      id
    }
  }
`;
export default query
