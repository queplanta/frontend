import graphql from 'babel-plugin-relay/macro';
import { commitMutation } from '../relay';

const mutation = graphql`
  mutation RevisionRevertMutation($input: RevisionRevertInput!) {
    revisionRevert(input: $input) {
      node {
        id
        Page
      }
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
    mutationName: 'revisionRevert',
    environment,
    mutation,
    input,
    callbacks,
  });
}

export default { commit };
