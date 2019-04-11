import graphql from 'babel-plugin-relay/macro';
import { commitMutation } from 'react-relay';

const mutation = graphql`
  mutation AuthMutation($input: AuthenticateInput!) {
    authenticate(input: $input) {
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

function commit(environment, username, password) {
  const clientMutationId = (nextClientMutationId++).toString();

  return commitMutation(environment, {
    mutation,
    variables: {
      input: { username, password, clientMutationId },
    },
    updater(store) {
      const rootViewer = store.getRoot();
      const me = store.getRootField('authenticate').getLinkedRecord('viewer').getLinkedRecord('me');
      if (me) {
        rootViewer.setLinkedRecord(me, 'me')
      }
    },
    onCompleted(response, errors) {
      console.log('onCompleted.response', response)
      console.log('onCompleted.errors', errors)
    },
    onError(error) {
      console.log('onError', error)
    }
  });
}

export default { commit };
