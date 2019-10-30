import graphql from 'babel-plugin-relay/macro';

const query = graphql`
  query OccurrencePlateQuery($id: ID!, $url: String!) {
    urlShortner(url: $url)
    occurrence(id: $id) {
      id,
      idInt,
      identity {
        id
        title
        commonName {
          name
        }
        parents {
          title
          rank
        }
      }
      isRequest
      ...WhatIsThis_occurrence
    }
  }
`;
export default query
