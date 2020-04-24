import graphql from 'babel-plugin-relay/macro';
import { commitMutation } from 'react-relay';

const mutation = graphql`
  mutation PlantDeleteMutation($input: LifeNodeDeleteInput!) {
    lifeNodeDelete(input: $input) {
      lifeNodeDeletedID
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
      if (response.lifeNodeDelete.errors && response.lifeNodeDelete.errors.length > 0) {
        if (typeof config.onError === 'function') {
          config.onError(response)
        }
      } else {
        if (typeof config.onSuccess === 'function') {
          config.onSuccess(response)
        }
        config.router.push('/plantas')
      }
    },
    onError(error) {
      console.error(error)
      if (typeof config.onError === 'function') {
        config.onError(error)
      }
    }
  });
}

export default { commit };
