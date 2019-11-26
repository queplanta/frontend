import graphql from 'babel-plugin-relay/macro';
import { commitMutation } from '../../relay';

const mutation = graphql`
  mutation WishItemAddMutation($input: WishItemAddInput!) {
    wishItemAdd(input: $input) {
      wishItem {
        node {
          id
          user {
            id
            username
            avatar(width: 40, height: 40) {
              url
            }
            ...ProfileLink_user
          }
          plant {
            id
            wishList {
             totalCount
            }
            myWishItem {
              id
            }
          }
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
    config: {
      configs: [
        {
          type: 'RANGE_ADD',
          parentID: input.plantId,
          connectionInfo: [{
            key: 'Plant_wishList',
            rangeBehavior: 'append'
          }],
          edgeName: 'wishItem',
        }
      ]
    }
  });
}

export default { commit };
