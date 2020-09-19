import graphql from "babel-plugin-relay/macro";

export const query = graphql`
  query UserOccurrenceMapQuery($username: String!) {
    user: userByUsername(username: $username) {
      id
      username
      firstName
    }
  }
`;

export default query;
