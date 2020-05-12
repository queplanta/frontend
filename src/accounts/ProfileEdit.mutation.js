import graphql from "babel-plugin-relay/macro";
import { commitMutation } from "../relay";

const mutation = graphql`
  mutation ProfileEditMutation($input: ProfileEditInput!) {
    meProfileEdit(input: $input) {
      user {
        id
        firstName
        username
        email
      }
      errors {
        code
        location
        message
      }
    }
  }
`;

function commit(environment, input, callbacks) {
  return commitMutation({
    mutationName: "meProfileEdit",
    environment,
    mutation,
    input,
    callbacks,
  });
}

export default { commit };
