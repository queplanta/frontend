import graphql from 'babel-plugin-relay/macro';
import { commitMutation } from 'react-relay';

const mutation = graphql`
  mutation CommentDeleteMutation($input: CommentDeleteInput!) {
    commentDelete(input: $input) {
      commentDeletedID
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
        deletedIDFieldName: 'commentDeletedID',
      }
    ],
    onCompleted(response, errors) {
      if (response.commentDelete.errors && response.commentDelete.errors.length > 0) {
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
