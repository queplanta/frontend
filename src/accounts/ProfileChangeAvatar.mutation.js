import graphql from 'babel-plugin-relay/macro';
import { commitMutation } from '../relay';

const mutation = graphql`
  mutation ProfileChangeAvatarMutation($input: ProfileChangeAvatarInput!) {
    meProfileChangeAvatar(input: $input) {
      viewer {
        id,
        me {
          id,
          username,
          isAuthenticated
          avatar(width: 40, height: 40) {
            url
          },
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

function commit(environment, input, uploadables, callbacks) {
  return commitMutation({
    mutationName: 'meProfileChangeAvatar',
    environment,
    mutation,
    input,
    uploadables,
    callbacks,
  });
}

export default { commit };
