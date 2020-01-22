import graphql from 'babel-plugin-relay/macro';

const query = graphql`
  query HomeQuery($bbox: String!) {
    viewer {
      id
      ...OccurrencesMapConnection_viewer @arguments(bbox: $bbox)
      ...PostList_viewer @arguments(count: 10)
    }
  }
`;
export default query
