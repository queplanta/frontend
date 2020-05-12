import graphql from "babel-plugin-relay/macro";
import { commitMutation } from "react-relay";

const mutation = graphql`
  mutation OccurrenceAddMutation($input: OccurrenceCreateInput!) {
    occurrenceCreate(input: $input) {
      occurrence {
        node {
          id
          ...WhatIsThis_occurrence
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
        response.occurrenceCreate.errors &&
        response.occurrenceCreate.errors.length > 0
      ) {
        if (typeof config.onError === "function") {
          config.onError(response);
        }
        if (typeof config.setFormErrors === "function") {
          config.setFormErrors(response.occurrenceCreate.errors);
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
