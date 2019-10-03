import graphql from 'babel-plugin-relay/macro';
import { commitMutation } from '../relay';

const mutation = graphql`
  mutation RevisionRevertMutation($input: PageCreateInput!) {
    revisionRevert(input: $input) {
      page {
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
    mutationName: 'revisionRevert',
    environment,
    mutation,
    input,
    callbacks,
  });
}

export default { commit };
