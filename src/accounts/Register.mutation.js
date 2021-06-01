import graphql from "babel-plugin-relay/macro";
import { commitMutation } from "react-relay";
import { Storage } from "@capacitor/storage";

const mutation = graphql`
  mutation RegisterMutation($input: RegisterAndAuthenticateInput!) {
    registerAndAuthenticate(input: $input) {
      token
      viewer {
        id
        me {
          id
          username
          isAuthenticated
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
        .getRootField("registerAndAuthenticate")
        .getLinkedRecord("viewer")
        .getLinkedRecord("me");
      if (me) {
        rootViewer.setLinkedRecord(me, "me");
      }
    },
    async onCompleted(response, errors) {
      if (response.registerAndAuthenticate.errors.length > 0) {
        if (typeof config.setFormErrors === "function") {
          config.setFormErrors(response.registerAndAuthenticate.errors);
        }
        if (typeof config.onError === "function") {
          config.onError(response);
        }
      } else {
        if (typeof config.onSuccess === "function") {
          await Storage.set({
            key: "auth_token",
            value: response.registerAndAuthenticate.token,
          });
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
