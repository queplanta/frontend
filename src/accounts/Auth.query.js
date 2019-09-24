import graphql from 'react-relay';

const query = graphql`
  fragment Auth_viewer on Query {
    id,
    me {
      username,
      isAuthenticated
    }
  }
`;
export default {viewer: query}
