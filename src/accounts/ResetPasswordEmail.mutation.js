import graphql from 'babel-plugin-relay/macro';
import { commitMutation } from '../relay';

const mutation = graphql`
  mutation ResetPasswordEmailMutation($input: PasswordResetEmailInput!) {
    mePasswordResetEmail(input: $input) {
      viewer {
        id,
        me {
          isAuthenticated
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

function commit(environment, input, callbacks) {
  return commitMutation({
    mutationName: 'mePasswordResetEmail',
    environment,
    mutation,
    input,
    callbacks,
  });
}

export default { commit };
