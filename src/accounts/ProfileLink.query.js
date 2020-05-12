import graphql from "babel-plugin-relay/macro";

const query = graphql`
  fragment ProfileLink_user on User {
    id
    username
    firstName
    reputation
    avatar(width: 40, height: 40) {
      url
    }
  }
`;
export default { user: query };
