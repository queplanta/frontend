import graphql from "babel-plugin-relay/macro";
import { commitMutation } from "../relay";

const mutation = graphql`
  mutation ProfileChangePasswordMutation($input: PasswordChangeInput!) {
    mePasswordChange(input: $input) {
      viewer {
        id
        me {
          id
          username
          isAuthenticated
        }
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
    mutationName: "mePasswordChange",
    environment,
    mutation,
    input,
    callbacks,
  });
}

export default { commit };
