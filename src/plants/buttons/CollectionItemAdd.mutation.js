import graphql from "babel-plugin-relay/macro";
import { commitMutation } from "../../relay";

const mutation = graphql`
  mutation CollectionItemAddMutation($input: CollectionItemAddInput!) {
    collectionItemAdd(input: $input) {
      collectionItem {
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
            collectionList {
              totalCount
            }
            myCollectionItem {
              id
            }
          }
        }
      }
      errors {
        code
        location
        message
      }
    }
  }
`;

function commit(environment, input, callbacks) {
  return commitMutation({
    mutationName: "collectionItemAdd",
    environment,
    mutation,
    input,
    callbacks,
    config: {
      configs: [
        {
          type: "RANGE_ADD",
          parentID: input.plantId,
          connectionInfo: [
            {
              key: "Plant_collectionList",
              rangeBehavior: "append",
            },
          ],
          edgeName: "collectionItem",
        },
      ],
    },
  });
}

export default { commit };
