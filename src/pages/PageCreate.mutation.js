import graphql from 'babel-plugin-relay/macro';
import { commitMutation } from '../relay';

const mutation = graphql`
  mutation PageCreateMutation($input: PageCreateInput!) {
    pageCreate(input: $input) {
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
    mutationName: 'pageCreate',
    environment,
    mutation,
    input,
    callbacks,
  });
}

export default { commit };
