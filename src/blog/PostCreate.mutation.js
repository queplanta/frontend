import graphql from 'react-relay';
import { commitMutation } from 'react-relay';

const mutation = graphql`
  mutation PostCreateMutation($input: PostCreateInput!) {
    postCreate(input: $input) {
      post {
        id
        title
        url
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
      console.log('updater');
      // const rootViewer = store.getRoot();
      // const me = store.getRootField('authenticate').getLinkedRecord('viewer').getLinkedRecord('me');
      // if (me) {
      //   rootViewer.setLinkedRecord(me, 'me')
      // }
    },
    onCompleted(response, errors) {
			if (response.postCreate.errors.length > 0) {
				if (typeof config.setFormErrors === 'function') {
					config.setFormErrors(response.postCreate.errors)
				}
			}
    },
    onError(error) {
      console.log('onError', error)
    }
  });
}

export default { commit };
