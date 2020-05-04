import graphql from 'babel-plugin-relay/macro';
import { commitMutation } from '../relay';

const mutation = graphql`
  mutation UsageCreateMutation($input: UsageCreateInput!) {
    usageCreate(input: $input) {
      usage {
        id
        title
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
    mutationName: 'usageCreate',
    environment,
    mutation,
    input,
    callbacks,
  });
}

export default { commit };
