import graphql from "babel-plugin-relay/macro";

const query = graphql`
  query ProfileChangeAvatarQuery {
    me {
      id
      username
      firstName
      email
      avatar(width: 100, height: 100) {
        url
      }
      isAuthenticated
      myPerms
    }
  }
`;
export default query;
