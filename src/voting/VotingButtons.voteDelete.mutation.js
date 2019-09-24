import graphql from 'react-relay';
import { commitMutation } from 'react-relay';

const mutation = graphql`
  mutation VotingButtonsDeleteMutation($input: VoteDeleteInput!) {
    voteDelete(input: $input) {
      voting {
        ...VotingButtons_voting
      }
      errors {
        code,
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
      if (response.voteDelete) {
        if (response.voteDelete.errors && response.voteDelete.errors.length > 0 && typeof config.onError === 'function') {
          config.onError(response.voteDelete.errors)
        } else if (typeof config.onSuccess === 'function') {
          config.onSuccess(response)
          config.stateVoteSet(null)
        }
      }
      if (errors && typeof config.onError === 'function') {
        config.onError(errors)
      }
    },
    onError(error) {
      console.error(error)
      if (typeof config.onError === 'function') {
        config.onError(error)
      }
    }
  });
}

export default { commit };
