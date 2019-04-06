import { Environment, Network, RecordSource, Store } from 'relay-runtime';

function fetchQuery(operation, variables, cacheConfig, uploadables) {
  return fetch("/graphql" , {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      // Auth Headers goes here
    },
    body: JSON.stringify({
      query: operation.text, // GraphQL text from input
      variables
    })
  }).then(response => {
    return response.json();
  });
}

// Create a network layer from the fetch function
const network = Network.create(fetchQuery);

export default function createRelayEnvironment(relaySsr, url) {
  return new Environment({
    network,
    store: new Store(new RecordSource()),
  });
}
