import graphql from 'react-relay';

const query = graphql`
  query OccurrenceQuery($id: ID!) {
    occurrence(id: $id) {
      id,
      idInt,
      identity {
        id
        title
      }
      isRequest
      ...WhatIsThis_occurrence
    }
  }
`;
export default query
