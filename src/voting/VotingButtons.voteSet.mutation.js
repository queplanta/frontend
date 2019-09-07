import graphql from 'babel-plugin-relay/macro';
import { commitMutation } from 'react-relay';

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
      config.stateVoteSet(response.voteSet.vote)
    },
    onError(error) {
      console.error(error)
    }
  });
}

export default { commit };
