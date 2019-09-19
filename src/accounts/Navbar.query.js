import graphql from 'babel-plugin-relay/macro';

const query = graphql`
  fragment Navbar_me on User {
    id,
    username,
    avatar(width: 40, height: 40) {
      url
    },
    isAuthenticated
  }
`;
export default {me: query}
