import React from "react";
import ReactDOM from "react-dom";
import RelayClientSSR from "react-relay-network-modern-ssr/lib/client";
import { BrowserProtocol } from "farce";
// import createInitialFarceRouter from 'found/lib/createInitialFarceRouter';
import { createFarceRouter } from "found";
import { Resolver } from "found-relay";
import { MatomoProvider, createInstance } from "@datapunt/matomo-tracker-react";
import * as Sentry from "@sentry/browser";
import * as serviceWorker from "./serviceWorker.js";

import createRelayEnvironment from "./relay/createRelayEnvironment.js";
import { historyMiddlewares, render, routeConfig } from "./router.js";

if (process.env.NODE_ENV === "production") {
  Sentry.init({
    dsn: "https://63e4553adb1448d5a0c5cb871e539640@sentry.io/1797427",
  });
}

const instance = createInstance({
  urlBase: "https://stats.levitar.net",
  siteId: 1,
});

(async () => {
  const resolver = new Resolver(
    createRelayEnvironment(
      // eslint-disable-next-line no-underscore-dangle
      new RelayClientSSR(window.__RELAY_PAYLOADS__),
      "/graphql"
    )
  );

  const Router = createFarceRouter({
    historyProtocol: new BrowserProtocol(),
    historyMiddlewares,
    routeConfig,
    resolver,
    render,
  });

  ReactDOM.hydrate(
    <MatomoProvider value={instance}>
      <Router resolver={resolver} />
    </MatomoProvider>,
    document.getElementById("root")
  );

  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: https://bit.ly/CRA-PWA
  serviceWorker.unregister();
})();
