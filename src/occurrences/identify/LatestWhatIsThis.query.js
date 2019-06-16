import graphql from 'babel-plugin-relay/macro';

export const fragmentQuery = graphql`
  fragment LatestWhatIsThis_viewer on Query
  @argumentDefinitions(
    count: {type: "Int", defaultValue: 2}
    after: {type: "String"}
  )
  {
    allWhatIsThis(
      first: $count,
      after: $after
    ) @connection(key: "List_allWhatIsThis") {
      edges {
        node {
          id,
          ...WhatIsThis_occurrence
        }
      }
    }
  }
`;

export const query = graphql`
  query LatestWhatIsThisQuery(
    $count: Int!,
    $after: String,
  ) {
    viewer {
      ...LatestWhatIsThis_viewer @arguments(count: $count, after: $after)
    }
  }
`;
