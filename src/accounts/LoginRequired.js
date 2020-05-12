import React, { useContext, useRef } from "react";
import { createFragmentContainer } from "react-relay";
import hoistNonReactStatics from "hoist-non-react-statics";
import fragmentSpec from "./Auth.query.js";
import AuthDialog from "./AuthDialog.js";
import { getDisplayName } from "../lib/helpers.js";

export const LoginRequiredContext = React.createContext({
  isAuthenticated: () => {},
  toggleAuthDialog: () => {},
  openAuthDialog: () => {},
  closeAuthDialog: () => {},
});

export const LoginRequiredProvider = createFragmentContainer(function ({
  relay,
  viewer,
  children,
}) {
  const dialogRef = useRef();

  function isAuthenticated() {
    if (viewer.me && viewer.me.isAuthenticated) {
      return true;
    } else {
      openAuthDialog({ showLoginRequired: true });
      return false;
    }
  }

  function toggleAuthDialog() {
    dialogRef.current.toggleAuthDialog();
  }

  function openAuthDialog(config) {
    dialogRef.current.onOpen(config);
  }

  function closeAuthDialog() {
    dialogRef.current.onClose();
  }

  const contextValue = {
    isAuthenticated,
    toggleAuthDialog,
    openAuthDialog,
    closeAuthDialog,
  };
  return (
    <LoginRequiredContext.Provider value={contextValue}>
      {children}
      <AuthDialog
        viewer={viewer}
        ref={dialogRef}
        environment={relay.environment}
      />
    </LoginRequiredContext.Provider>
  );
},
fragmentSpec);

export function useLoginRequired() {
  const { isAuthenticated } = useContext(LoginRequiredContext);

  return {
    isAuthenticated: isAuthenticated,
  };
}

export const withLoginRequired = (Component) => {
  const WrappedComponent = React.forwardRef((props, ref) => (
    <LoginRequiredContext.Consumer>
      {(context) => (
        <Component
          {...props}
          ref={ref}
          isAuthenticated={context.isAuthenticated}
          toggleAuthDialog={context.toggleAuthDialog}
          openAuthDialog={context.openAuthDialog}
          closeAuthDialog={context.closeAuthDialog}
        />
      )}
    </LoginRequiredContext.Consumer>
  ));

  WrappedComponent.displayName = `WithLoginRequired(${getDisplayName(
    Component
  )})`;

  hoistNonReactStatics(WrappedComponent, Component);

  return WrappedComponent;
};
