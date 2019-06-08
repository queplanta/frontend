import graphql from 'babel-plugin-relay/macro';
import { commitMutation } from 'react-relay';

const mutation = graphql`
  mutation RegisterMutation($input: RegisterAndAuthenticateInput!) {
    registerAndAuthenticate(input: $input) {
      viewer {
        id,
        me {
          id,
          username,
          isAuthenticated
        }
      },
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
      const rootViewer = store.getRoot();
      const me = store.getRootField('registerAndAuthenticate').getLinkedRecord('viewer').getLinkedRecord('me');
      if (me) {
        rootViewer.setLinkedRecord(me, 'me')
      }
    },
    onCompleted(response, errors) {
			if (response.registerAndAuthenticate.errors.length > 0) {
				if (typeof config.setFormErrors === 'function') {
					config.setFormErrors(response.registerAndAuthenticate.errors)
				}
			}
    },
    onError(error) {
      console.error(error)
    }
  });
}

export default { commit };
