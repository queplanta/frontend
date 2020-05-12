import graphql from "babel-plugin-relay/macro";
import { commitMutation } from "react-relay";

const mutation = graphql`
  mutation SuggestionDeleteMutation($input: SuggestionIDDeleteInput!) {
    suggestionIDDelete(input: $input) {
      suggestionDeletedID
      errors {
        code
        location
        message
      }
    }
  }
`;

let nextClientMutationId = 0;

function commit(environment, input, config) {
  const clientMutationId = (nextClientMutationId++).toString();

  return commitMutation(environment, {
    mutation,
    variables: {
      input: { clientMutationId, ...input },
    },
    configs: [
      {
        type: "NODE_DELETE",
        deletedIDFieldName: "suggestionDeletedID",
      },
    ],
    onCompleted(response, errors) {
      if (response.suggestionIDDelete) {
        if (
          response.suggestionIDDelete.errors &&
          response.suggestionIDDelete.errors.length > 0
        ) {
          if (typeof config.onError === "function") {
            config.onError(response);
          }
        } else {
          if (typeof config.onSuccess === "function") {
            config.onSuccess(response);
          }
        }
      }
      if (errors) {
        console.error(errors);
        if (typeof config.onError === "function") {
          config.onError(response);
        }
      }
    },
    onError(error) {
      console.log("onError", error);
    },
  });
}

export default { commit };
