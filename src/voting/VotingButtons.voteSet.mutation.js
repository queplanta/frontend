import graphql from "babel-plugin-relay/macro";
import { commitMutation } from "react-relay";

const mutation = graphql`
  mutation VotingButtonsSetMutation($input: VoteSetInput!) {
    voteSet(input: $input) {
      voting {
        ...VotingButtons_voting
      }
      vote {
        id
        value
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
      if (response.voteSet) {
        if (
          response.voteSet.errors &&
          response.voteSet.errors.length > 0 &&
          typeof config.onError === "function"
        ) {
          config.onError(response.voteSet.errors);
        } else if (typeof config.onSuccess === "function") {
          config.onSuccess(response);
          config.stateVoteSet(response.voteSet.vote);
        }
      }
      if (errors && typeof config.onError === "function") {
        config.onError(errors);
      }
    },
    onError(error) {
      console.error(error);
      if (typeof config.onError === "function") {
        config.onError(error);
      }
    },
  });
}

export default { commit };
