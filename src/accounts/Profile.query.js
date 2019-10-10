import graphql from 'babel-plugin-relay/macro';

const query = graphql `
  query ProfileQuery($username: String!) {
    user: userByUsername(username: $username) {
      id
      username
      reputation
      avatar(width: 80, height: 80) {
        url
      }
      ...UserActivityList_user
    }
    me {
      id
    }
  }
`;
export default query