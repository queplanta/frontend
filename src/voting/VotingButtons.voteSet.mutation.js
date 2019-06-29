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
    updater(store) {
			// console.log(store.getRootField('voteSet'))
      // const rootViewer = store.getRoot();
      // const me = store.getRootField('voteSet').getLinkedRecord('viewer').getLinkedRecord('me');
      // if (me) {
      //   rootViewer.setLinkedRecord(me, 'me')
      // }
    },
    onCompleted(response, errors) {
      console.log(response)
      config.stateVoteSet(response.voteSet.vote)
			// if (response.registerAndAuthenticat.errors.length > 0) {
			//   if (typeof config.setFormErrors === 'function') {
			//     config.setFormErrors(response.registerAndAuthenticate.errors)
			//   }
			// }
    },
    onError(error) {
      console.error(error)
    }
  });
}

export default { commit };
