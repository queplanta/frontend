import graphql from "babel-plugin-relay/macro";
import { commitMutation } from "../relay";

const mutation = graphql`
  mutation AuthSocialMutation($input: SocialAuthInput!) {
    socialAuth(input: $input) {
      social {
        id
      }
      clientMutationId
    }
  }
`;

function commit(environment, input, callbacks) {
  return commitMutation({
    environment,
    mutationName: "socialAuth",
    input,
    mutation,
    callbacks,
  });
}

export default { commit };
