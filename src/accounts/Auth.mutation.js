import graphql from "babel-plugin-relay/macro";
import { commitMutation } from "react-relay";

const mutation = graphql`
  mutation AuthMutation($input: AuthenticateInput!) {
    authenticate(input: $input) {
      viewer {
        id
        me {
          id
          ...Navbar_me
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

let nextClientMutationId = 0;

function commit(environment, input, config) {
  const clientMutationId = (nextClientMutationId++).toString();

  return commitMutation(environment, {
    mutation,
    variables: {
      input: { clientMutationId, ...input },
    },
    updater(store) {
      const rootViewer = store.getRoot();
      const me = store
        .getRootField("authenticate")
        .getLinkedRecord("viewer")
        .getLinkedRecord("me");
      if (me) {
        rootViewer.setLinkedRecord(me, "me");
      }
    },
    onCompleted(response, errors) {
      if (response.authenticate.errors.length > 0) {
        if (typeof config.setFormErrors === "function") {
          config.setFormErrors(response.authenticate.errors);
        }
        if (typeof config.onError === "function") {
          config.onError(response);
        }
      } else {
        if (typeof config.onSuccess === "function") {
          config.onSuccess(response);
        }
      }
    },
    onError(error) {
      console.error(error);
    },
  });
}

export default { commit };
