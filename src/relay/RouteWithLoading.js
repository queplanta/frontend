import React from "react";
import { CircularProgress, withStyles } from "@material-ui/core";
import ErrorPage from '../pages/ErrorPage.js';

const Loading = withStyles((theme) => ({
  wrapper: {
    margin: theme.spacing(3, 0, 0, 0),
    textAlign: "center",
  },
}))(({ classes, ...others }) => {
  const { wrapper, ...otherClasses } = classes;
  return (
    <div className={wrapper}>
      <CircularProgress classes={otherClasses} {...others} />
    </div>
  );
});

export default class Route {
  constructor({ Component, render, ...others }) {
    const props = {
      Component,
      render: (args) => {
        if (args.props) {
          if (typeof render === "function") {
            return render(args);
          }
          return <Component environment={args.environment} {...args.props} />;
        }
        if (args.error) {
          return <ErrorPage />
        }
        return <Loading />
      },
      ...others,
    };
    Object.assign(this, props);
  }
}

// if (__DEV__) {
//   // Workaround to make React Proxy give me the original class, to allow
//   // makeRouteConfig to get the actual class, when using JSX for routes.
//   Route.prototype.isReactComponent = {};
// }
