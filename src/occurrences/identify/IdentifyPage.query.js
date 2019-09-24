import graphql from 'react-relay';

const query = graphql`
  query IdentifyPageQuery {
    viewer {
      id
    }
  }
`;
export default query
