import graphql from 'babel-plugin-relay/macro';

const query = graphql`
  query HomePlantQuery(
    $search: String,
    $edibles: Boolean
  )
  {
    viewer {
      id
      ...PlantList_viewer @arguments(edibles: $edibles, search: $search)
    }
  }
`;

export default query