import graphql from "babel-plugin-relay/macro";

const query = graphql`
  query HomeQuery {
    viewer {
      me {
        ...Navbar_me
        isAuthenticated
      }
      ...Auth_viewer
      ...PostList_viewer @arguments(count: 10)
    }
  }
`;
export default query;
