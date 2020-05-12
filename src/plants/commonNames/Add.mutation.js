import graphql from "babel-plugin-relay/macro";
import { commitMutation } from "../../relay";

const mutation = graphql`
  mutation AddCommonNameMutation($input: CommonNameAddInput!) {
    lifeNodeCommonNameAdd(input: $input) {
      commonName {
        node {
          id
          ...CommonNameItem_commonName
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
    mutationName: "lifeNodeCommonNameAdd",
    environment,
    mutation,
    input,
    callbacks,
    config: {
      configs: [
        {
          type: "RANGE_ADD",
          parentID: input.lifeNode,
          connectionInfo: [
            {
              key: "lifeNode__commonNames",
              rangeBehavior: "append",
            },
          ],
          edgeName: "commonName",
        },
      ],
    },
  });
}

export default { commit };
