import graphql from 'babel-plugin-relay/macro';
import { commitMutation } from 'react-relay';

const mutation = graphql`
  mutation AddIdentifyMutation($input: WhatIsThisCreateInput!) {
    whatIsThisCreate(input: $input) {
      occurrence {
        node {
          id
          ...WhatIsThis_occurrence
        }
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

function commit(environment, input, uploadables, config) {
  const clientMutationId = (nextClientMutationId++).toString();

  return commitMutation(environment, {
    mutation,
    variables: {
      input: { clientMutationId, ...input },
    },
    uploadables,
    configs: [
      {
        type: 'RANGE_ADD',
        parentID: 'viewer',
        connectionInfo: [{
          key: 'List_allWhatIsThis',
          rangeBehavior: 'prepend'
        }],
        edgeName: 'occurrence',
      }
    ],
    onCompleted(response, errors) {
			if (response.whatIsThisCreate.errors && response.whatIsThisCreate.errors.length > 0) {
				if (typeof config.onError === 'function') {
          config.onError(response)
        }
				if (typeof config.setFormErrors === 'function') {
					config.setFormErrors(response.whatIsThisCreate.errors)
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
