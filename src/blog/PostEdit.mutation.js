import graphql from 'babel-plugin-relay/macro';
import { commitMutation } from '../relay';

const mutation = graphql`
  mutation PostEditMutation($input: PostEditInput!) {
    postEdit(input: $input) {
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

function commit(environment, input, callbacks) {
  return commitMutation({
    mutationName: 'postEdit',
    environment,
    mutation,
    input,
    callbacks,
  });
}

export default { commit };

