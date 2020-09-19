import graphql from "babel-plugin-relay/macro";

const query = graphql`
  query ProfileQuery($username: String!) {
    user: userByUsername(username: $username) {
      id
      username
      firstName
      reputation
      avatar(width: 180, height: 180) {
        url
      }
      collectionList {
        totalCount
      }
      wishList {
        totalCount
      }
      occurrencesList {
        totalCount
      }
      ...UserActivityList_user
    }
    me {
      id
    }
  }
`;
export default query;
