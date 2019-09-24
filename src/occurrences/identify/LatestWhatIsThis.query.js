import graphql from 'react-relay';

export const fragmentQuery = graphql`
  fragment LatestWhatIsThis_viewer on Query
  @argumentDefinitions(
    count: {type: "Int", defaultValue: 2}
    after: {type: "String"}
    isIdentityNull: {type: "Boolean", defaultValue: true}
  )
  {
    allWhatIsThis(
      isIdentityNull: $isIdentityNull,
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

export const fragmentSpec = {
  viewer: fragmentQuery
}

export const query = graphql`
  query LatestWhatIsThisQuery(
    $isIdentityNull: Boolean!,
    $count: Int!,
    $after: String,
  ) {
    viewer {
      ...LatestWhatIsThis_viewer @arguments(count: $count, after: $after, isIdentityNull: $isIdentityNull)
    }
  }
`;
