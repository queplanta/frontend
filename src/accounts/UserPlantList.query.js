import graphql from 'babel-plugin-relay/macro';

export const fragmentQuery = graphql`
  fragment UserPlantList_viewer on Query
  @argumentDefinitions(
    count: {type: "Int", defaultValue: 30}
    cursor: {type: "String"}
  )
  {
    wishList(
      first: $count
      after: $cursor
    ) @connection(key: "UserPlantList_wishList") {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        node {
          id
        }
      }
    }
  }
`

export const fragmentSpec = {
  viewer: fragmentQuery
}

export const query = graphql`
  query UserPlantListQuery(
    $count: Int!
    $cursor: String
  ) {
    viewer {
      ...UserPlantList_viewer @arguments(count: $count, cursor: $cursor)
    }
  }
`

export default query