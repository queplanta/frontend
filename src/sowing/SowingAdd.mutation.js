import graphql from "babel-plugin-relay/macro";
import { commitMutation } from "react-relay";

const mutation = graphql`
  mutation SowingAddMutation($input: SowingCreateInput!) {
    sowingCreate(input: $input) {
      sowing {
        node {
          id
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

function commit(environment, input, uploadables, config) {
  const clientMutationId = (nextClientMutationId++).toString();

  return commitMutation(environment, {
    mutation,
    variables: {
      input: { clientMutationId, ...input },
    },
    uploadables,
    onCompleted(response, errors) {
      if (errors && errors.length > 0) {
        console.error(errors);
        if (typeof config.onError === "function") {
          config.onError(errors);
        }
      } else if (
        response.sowingCreate.errors &&
        response.sowingCreate.errors.length > 0
      ) {
        if (typeof config.onError === "function") {
          config.onError(response);
        }
        if (typeof config.setFormErrors === "function") {
          config.setFormErrors(response.sowingCreate.errors);
        }
      } else {
        if (typeof config.onSuccess === "function") {
          config.onSuccess(response);
        }
      }
    },
    onError(error) {
      console.log("onError", error);
    },
  });
}

export default { commit };
