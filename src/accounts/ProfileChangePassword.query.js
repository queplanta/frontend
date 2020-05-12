import graphql from "babel-plugin-relay/macro";

const query = graphql`
  query ProfileChangePasswordQuery {
    me {
      id
      username
      isAuthenticated
    }
  }
`;
export default query;
