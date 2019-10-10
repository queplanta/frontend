import graphql from 'babel-plugin-relay/macro';

const query = graphql`
  query ProfileEditQuery {
    me {
      id,
      username,
      firstName,
      email,
      avatar(width: 40, height: 40) {
        url
      },
      isAuthenticated,
      myPerms
    }
  }
`;
export default query
