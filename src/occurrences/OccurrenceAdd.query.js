import graphql from 'babel-plugin-relay/macro';

const query = graphql`
  query OccurrenceAddQuery {
    viewer {
      id
    }
  }
`;
export default query
