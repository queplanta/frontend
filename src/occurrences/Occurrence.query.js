import graphql from "babel-plugin-relay/macro";

const query = graphql`
  query OccurrenceQuery($id: ID!) {
    occurrence(id: $id) {
      id
      idInt
      identity {
        id
        idInt
        title
        slug
        commonName {
          name
        }
      }
      isRequest
      ...WhatIsThis_occurrence
      ...OccurrenceDetails_occurrence
    }
  }
`;
export default query;
