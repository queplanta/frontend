import graphql from 'babel-plugin-relay/macro';

const query = graphql`
  query HomePlantQuery {
    viewer {
      id
      ...PlantList_viewer
    }
  }
`;

export default query