import graphql from "babel-plugin-relay/macro";
import { commitMutation } from "../relay";

const mutation = graphql`
  mutation ResetPasswordCompleteMutation($input: PasswordResetCompleteInput!) {
    mePasswordResetComplete(input: $input) {
      viewer {
        id
        me {
          id
          username
          avatar(width: 40, height: 40) {
            url
          }
          isAuthenticated
          myPerms
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
    mutationName: "mePasswordResetComplete",
    environment,
    mutation,
    input,
    callbacks,
  });
}

export default { commit };
