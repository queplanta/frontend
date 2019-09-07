import graphql from 'babel-plugin-relay/macro';

const query = graphql`
  query OccurrenceAddQuery {
    viewer {
      id
      ...PlantSelectField_viewer
    }
  }
`;
export default query
