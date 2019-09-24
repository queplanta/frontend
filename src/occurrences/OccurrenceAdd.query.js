import graphql from 'react-relay';

const query = graphql`
  query OccurrenceAddQuery {
    viewer {
      id
    }
  }
`;
export default query
