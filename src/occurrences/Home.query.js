import graphql from 'react-relay';

const query = graphql`
  query HomeOccurrenceQuery {
    viewer {
      id
    }
  }
`;

export default query