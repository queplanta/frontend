import graphql from 'babel-plugin-relay/macro';
import { commitMutation } from 'react-relay';

const mutation = graphql`
  mutation PlantEditMutation($input: LifeNodeEditInput!) {
    lifeNodeEdit(input: $input) {
      lifeNode {
        id
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
    onCompleted(response, errors) {
      if (response.lifeNodeEdit) {
        if (response.lifeNodeEdit.errors && response.lifeNodeEdit.errors.length > 0) {
          if (typeof config.setFormErrors === 'function') {
            config.setFormErrors(response.lifeNodeEdit.errors)
          }
        } if (typeof config.onSuccess === 'function') {
          config.onSuccess(response)
        }
      }
      if (errors && errors.length > 0) {
        console.error(errors)
        if (typeof config.onError === 'function') {
          config.onError(errors)
        }
      }
    },
    onError(error) {
      console.log('onError', error)
    }
  });
}

export default { commit };
