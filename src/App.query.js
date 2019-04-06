// import { graphql } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';

const query = graphql`
  query AppQuery {
    viewer {
      me {
        isAuthenticated
      }
    }
  }
`;
export default query
