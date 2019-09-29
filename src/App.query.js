import graphql from 'babel-plugin-relay/macro';

const query = graphql`
  query AppQuery {
    viewer {
      id,
      me {
        ...Navbar_me
        isAuthenticated
      }
      ...Auth_viewer
    }
  }
`;
export default query
