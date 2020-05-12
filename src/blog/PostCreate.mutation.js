import graphql from "babel-plugin-relay/macro";
import { commitMutation } from "../relay";

const mutation = graphql`
  mutation PostCreateMutation($input: PostCreateInput!) {
    postCreate(input: $input) {
      post {
        id
        title
        url
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
    mutationName: "postCreate",
    environment,
    mutation,
    input,
    callbacks,
  });
}

export default { commit };
