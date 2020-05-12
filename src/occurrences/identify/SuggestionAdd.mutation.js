import graphql from "babel-plugin-relay/macro";
import { commitMutation } from "react-relay";

const mutation = graphql`
  mutation SuggestionAddMutation($input: SuggestionIDCreateInput!) {
    suggestionIDCreate(input: $input) {
      suggestionID {
        node {
          id
          ...SuggestionItem_suggestionID
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
        type: "RANGE_ADD",
        parentID: input.occurrence,
        connectionInfo: [
          {
            key: "Occurrence_suggestions",
            rangeBehavior: "append",
          },
        ],
        edgeName: "suggestionID",
      },
    ],
    onCompleted(response, errors) {
      if (response.suggestionIDCreate) {
        if (
          response.suggestionIDCreate.errors &&
          response.suggestionIDCreate.errors.length > 0
        ) {
          if (typeof config.setFormErrors === "function") {
            config.setFormErrors(response.suggestionIDCreate.errors);
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
