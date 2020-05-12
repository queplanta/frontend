import graphql from "babel-plugin-relay/macro";
import { commitMutation } from "react-relay";

const mutation = graphql`
  mutation CommentEditMutation($input: CommentEditInput!) {
    commentEdit(input: $input) {
      comment {
        id
        ...CommentsItem_comment
      }
      errors {
        code
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
      if (
        response.commentEdit &&
        response.commentEdit.errors &&
        response.commentEdit.errors.length > 0
      ) {
        if (typeof config.setFormErrors === "function") {
          config.setFormErrors(response.commentEdit.errors);
        }
      } else {
        if (typeof config.onSuccess === "function") {
          config.onSuccess(response);
        }
      }
    },
    onError(error) {
      console.log("onError", error);
    },
  });
}

export default { commit };
