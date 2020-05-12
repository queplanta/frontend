import graphql from "babel-plugin-relay/macro";
import { commitMutation } from "react-relay";

const mutation = graphql`
  mutation WhatIsThisIdentifyMutation($input: WhatIsThisIdentifyInput!) {
    whatIsThisIdentify(input: $input) {
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

function commit(environment, input, config) {
  const clientMutationId = (nextClientMutationId++).toString();

  return commitMutation(environment, {
    mutation,
    variables: {
      input: { clientMutationId, ...input },
    },
    onCompleted(response, errors) {
      if (response.whatIsThisIdentify) {
        if (
          response.whatIsThisIdentify.errors &&
          response.whatIsThisIdentify.errors.length > 0
        ) {
          if (typeof config.setFormErrors === "function") {
            config.setFormErrors(response.whatIsThisIdentify.errors);
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
      console.error("onError", error);
    },
  });
}

export default { commit };
