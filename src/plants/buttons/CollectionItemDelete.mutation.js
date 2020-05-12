import graphql from "babel-plugin-relay/macro";
import { commitMutation } from "../../relay";

const mutation = graphql`
  mutation CollectionItemDeleteMutation($input: CollectionItemDeleteInput!) {
    collectionItemDelete(input: $input) {
      deletedId
      lifeNode {
        id
        collectionList {
          totalCount
        }
        myCollectionItem {
          id
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
    mutationName: "collectionItemDelete",
    environment,
    mutation,
    input,
    callbacks,
    config: {
      configs: [
        {
          type: "NODE_DELETE",
          deletedIDFieldName: "deletedId",
        },
      ],
    },
  });
}

export default { commit };
