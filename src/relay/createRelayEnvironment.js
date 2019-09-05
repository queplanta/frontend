import { Environment, Network, RecordSource, Store } from 'relay-runtime';

function fetchQuery(operation, variables, cacheConfig, uploadables) {
  let requestVariables = {
    method: 'POST',
    headers: {
      'Accept': "application/json",
    }
  }

  let body

  if (uploadables instanceof FormData) {
    uploadables.append('query', operation.text)
    uploadables.append('variables', JSON.stringify(variables))
    body = uploadables
  } else {
    requestVariables.headers['Content-Type'] = 'application/json'
    body = JSON.stringify({
      query: operation.text,
      variables,
    })
  }

  return fetch("/graphql" , {
    ...requestVariables,
    body
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
