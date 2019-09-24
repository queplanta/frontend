import graphql from 'react-relay';

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
  }
`;
export default query