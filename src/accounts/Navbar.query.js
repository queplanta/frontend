import graphql from 'babel-plugin-relay/macro';

const query = graphql`
  fragment Navbar_me on User {
    id,
    username,
    isAuthenticated
  }
`;
export default query
