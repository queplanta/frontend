import graphql from "babel-plugin-relay/macro";

const query = graphql`
  fragment UserListItem_user on User {
    id
    firstName
    lastName
    dateJoined
    username
    reputation
    avatar(width: 40, height: 40) {
      url
    }
  }
`;
export default { user: query };
