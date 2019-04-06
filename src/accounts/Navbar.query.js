import graphql from 'babel-plugin-relay/macro';
// import { graphql } from 'react-relay';

const query = graphql`
  fragment Navbar_me on User {
    id,
    username,
    isAuthenticated
  }
`;
export default query
