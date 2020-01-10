import graphql from 'babel-plugin-relay/macro';

const query = graphql`
  query HomeOccurrenceQuery($bbox: String!) {
    viewer {
      id
      ...OccurrencesMapConnection_viewer @arguments(bbox: $bbox)
    }
  }
`;

export default query