import graphql from "babel-plugin-relay/macro";

const query = graphql`
  fragment Auth_viewer on Query {
    id
    me {
      username
      isAuthenticated
      myPerms
    }
  }
`;
export default { viewer: query };
