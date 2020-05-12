import graphql from "babel-plugin-relay/macro";

const query = graphql`
  query HomeOccurrenceQuery {
    viewer {
      id
    }
  }
`;

export default query;
