import graphql from 'react-relay';
import { commitMutation } from 'react-relay';

const mutation = graphql`
  mutation CommentCreateMutation($input: CommentCreateInput!) {
    commentCreate(input: $input) {
      comment {
        node {
          id
          ...CommentsItem_comment
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

function commit(environment, input, config) {
  const clientMutationId = (nextClientMutationId++).toString();

  return commitMutation(environment, {
    mutation,
    variables: {
      input: { clientMutationId, ...input },
    },
    configs: [
      {
        type: 'RANGE_ADD',
        parentID: input.parent,
        connectionInfo: [{
          key: 'CommentsList_comments',
          rangeBehavior: 'prepend'
        }],
        edgeName: 'comment',
      }
    ],
    onCompleted(response, errors) {
      if (response.commentCreate && response.commentCreate.errors && response.commentCreate.errors.length > 0) {
        if (typeof config.setFormErrors === 'function') {
          config.setFormErrors(response.commentCreate.errors)
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
