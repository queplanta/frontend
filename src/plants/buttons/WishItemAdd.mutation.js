import graphql from 'babel-plugin-relay/macro';
import { commitMutation } from '../../relay';

const mutation = graphql`
  mutation WishItemAddMutation($input: WishItemAddInput!) {
    wishItemAdd(input: $input) {
      wishItem {
        node {
          id
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
    mutationName: 'wishItemAdd',
    environment,
    mutation,
    input,
    callbacks,
  });
}

export default { commit };