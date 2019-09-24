import graphql from 'react-relay';
import { commitMutation } from 'react-relay';

const mutation = graphql`
  mutation DeauthMutation($input: DeauthenticateInput!) {
    deauthenticate(input: $input) {
      viewer {
        id,
        me {
          isAuthenticated
        }
      }
    }
  }
`;

let nextClientMutationId = 0;

function commit(environment) {
  const clientMutationId = (nextClientMutationId++).toString();

  return commitMutation(environment, {
    mutation,
    variables: {
      input: { clientMutationId },
    },
    updater(store) {
      const rootViewer = store.getRoot();
      rootViewer.setValue(null, 'me')
    },
  });
}

export default { commit };
