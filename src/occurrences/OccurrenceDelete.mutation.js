import graphql from 'react-relay';
import { commitMutation } from 'react-relay';

const mutation = graphql`
  mutation OccurrenceDeleteMutation($input: OccurrenceDeleteInput!) {
    occurrenceDelete(input: $input) {
      occurenceDeletedID
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
    configs: [
      {
        type: 'NODE_DELETE',
        deletedIDFieldName: 'occurenceDeletedID',
      }
    ],
    onCompleted(response, errors) {
			if (response.occurrenceDelete.errors && response.occurrenceDelete.errors.length > 0) {
				if (typeof config.onError === 'function') {
          config.onError(response)
        }
      } else {
				if (typeof config.onSuccess === 'function') {
          config.onSuccess(response)
        }
      }
    },
    onError(error) {
      console.log('onError', error)
    }
  });
}

export default { commit };
