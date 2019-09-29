import { commitMutation as relayCommitMutation } from 'react-relay';
import _ from 'lodash';

let nextClientMutationId = 0;

export function commitMutation({environment, mutation, input, config, callbacks, mutationName}) {
  const clientMutationId = (nextClientMutationId++).toString();

  return relayCommitMutation(environment, {
    mutation,
    variables: {
      input: { clientMutationId, ...input },
    },
    onCompleted(response, errors) {
      const errorsFromResponse = _.get(response, `${mutationName}.errors`, []);
      if (errors && errors.length > 0) {
          console.error(errors)
          if (typeof callbacks.onError === 'function') {
            callbacks.onError(errors)
          }
      } else if (errorsFromResponse && errorsFromResponse.length > 0) {
        if (typeof callbacks.onError === 'function') {
          callbacks.onError(errorsFromResponse)
        }
        if (typeof callbacks.setFormErrors === 'function') {
          callbacks.setFormErrors(errorsFromResponse)
        }
      } else {
        if (typeof callbacks.onSuccess === 'function') {
          callbacks.onSuccess(response)
        }
      }
    },
    onError(error) {
      console.log('onError', error)
      if (typeof callbacks.onError === 'function') {
        callbacks.onError(error)
      }
    },
    ...config
  });
}
