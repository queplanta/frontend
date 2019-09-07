import graphql from 'babel-plugin-relay/macro';
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
      config.stateVoteSet(null)
    },
    onError(error) {
      console.error(error)
    }
  });
}

export default { commit };
