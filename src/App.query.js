import graphql from 'react-relay';

const query = graphql`
  query AppQuery {
    viewer {
      id,
      me {
        ...Navbar_me
      }
      ...Auth_viewer
    }
  }
`;
export default query
