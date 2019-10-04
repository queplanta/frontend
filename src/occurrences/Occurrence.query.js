import graphql from 'babel-plugin-relay/macro';

const query = graphql`
  query OccurrenceQuery($id: ID!) {
    occurrence(id: $id) {
      id,
      idInt,
      identity {
        id
        title
        commonName {
          name
        }
      }
      isRequest
      ...WhatIsThis_occurrence
    }
  }
`;
export default query
