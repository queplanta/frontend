import graphql from 'react-relay';

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