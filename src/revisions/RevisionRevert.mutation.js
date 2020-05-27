import graphql from "babel-plugin-relay/macro";
import { commitMutation } from "../relay";

const mutation = graphql`
  mutation RevisionRevertMutation($input: RevisionRevertInput!) {
    revisionRevert(input: $input) {
      node {
        id
        ... on LifeNode {
          revision {
            id
            isTip
          }
        }
        ... on Page {
          revision {
            id
            isTip
          }
        }
        ... on Post {
          revision {
            id
            isTip
          }
        }
        ... on Comment {
          revision {
            id
            isTip
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
    mutationName: "revisionRevert",
    environment,
    mutation,
    input,
    callbacks,
  });
}

export default { commit };
