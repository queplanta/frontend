import graphql from 'babel-plugin-relay/macro';
import { commitMutation } from '../../relay';

const mutation = graphql`
  mutation WishItemDeleteMutation($input: WishItemDeleteInput!) {
    wishItemDelete(input: $input) {
      deletedId
      lifeNode {
        id
        wishList {
         totalCount
        }
        myWishItem {
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
    mutationName: 'wishItemDelete',
    environment,
    mutation,
    input,
    callbacks,
    config: {
      configs: [
        {
          type: 'NODE_DELETE',
          deletedIDFieldName: 'deletedId',
        }
      ]
    }
  });
}

export default { commit };
